import { redirect } from "next/navigation"
import { DrizzleQueryError } from "drizzle-orm"
import { getCurrentUser } from "@/shared/lib/auth/get-current-user"

/**
 * Validated return type for Data Access Layer operations.
 * Returns { success: true, data: T } on success,
 * or { success: false, error: E } on failure.
 */
export type DalReturn<T, E extends DalError = DalError> =
    | {
        success: true
        data: T
    }
    | {
        success: false
        error: E
    }

/**
 * Discriminatiod union of possible DAL errors.
 */
export type DalError =
    | {
        type: "no-user"
    }
    | {
        type: "no-access"
    }
    | {
        type: "drizzle-error"
        error: DrizzleQueryError
    }
    | {
        type: "unknown-error"
        error: unknown
    }

/**
 * wrapper error to support throwing DAL errors within async operations,
 * allowing them to be caught and converted to DalReturn.
 */
export class ThrowableDalError extends Error {
    dalError: DalError

    constructor(dalError: DalError) {
        super("ThrowableDalError")
        this.dalError = dalError
    }
}

/**
 * Creates a successful DalReturn with the provided data.
 */
export function createSuccessReturn<T>(data: T): DalReturn<T> {
    return { success: true, data }
}

/**
 * Creates a failed DalReturn with the provided error.
 */
export function createErrorReturn<E extends DalError>(
    error: E,
): DalReturn<never> {
    return { success: false, error }
}

/**
 * Redirects to /login if the error is "no-user".
 * Otherwise returns the original DalReturn.
 */
export function dalLoginRedirect<T, E extends DalError>(
    dalReturn: DalReturn<T, E>,
) {
    if (dalReturn.success) return dalReturn
    if (dalReturn.error.type === "no-user") return redirect("/login")

    return dalReturn as DalReturn<T, Exclude<E, { type: "no-user" }>>
}

/**
 * Redirects to the root (or specified path) if the error is "no-access".
 * Otherwise returns the original DalReturn.
 */
export function dalUnauthorizedRedirect<T, E extends DalError>(
    dalReturn: DalReturn<T, E>,
    redirectPath = "/",
) {
    if (dalReturn.success) return dalReturn
    if (dalReturn.error.type === "no-access") return redirect(redirectPath)

    return dalReturn as DalReturn<T, Exclude<E, { type: "no-access" }>>
}

/**
 * Throws the error within the DalReturn if it is a failure.
 * Used when you want to surface the error to a boundary (e.g. error.tsx or nearest try/catch).
 */
export function dalThrowError<T, E extends DalError>(
    dalReturn: DalReturn<T, E>,
) {
    if (dalReturn.success) return dalReturn

    throw dalReturn.error
}

/**
 * Verifies success of a DAL operation.
 * Automatically handles common auth redirects:
 * - Redirects to /login if no user.
 * - Redirects to root (or unauthorizedRedirectPath) if access denied.
 * - Throws any other error.
 * @returns The successful data T.
 */
export function dalVerifySuccess<T, E extends DalError>(
    dalReturn: DalReturn<T, E>,
    { unauthorizedRedirectPath }: { unauthorizedRedirectPath?: string } = {},
): T {
    const res = dalThrowError(
        dalUnauthorizedRedirect(
            dalLoginRedirect(dalReturn),
            unauthorizedRedirectPath,
        ),
    )
    return res.data
}

/**
 * Wraps a DB operation with authentication checks.
 * Returns "no-user" error if not logged in.
 * NOTE: Role access checking is intentionally removed but the signature is preserved for compatibility.
 */
export async function dalRequireAuth<T, E extends DalError>(
    operation: (user: Awaited<ReturnType<typeof getCurrentUser>>) => Promise<DalReturn<T, E>>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _options: { allowedRoles?: string[] } = {},
) {
    const user = await getCurrentUser()

    if (user == null) {
        return createErrorReturn({ type: "no-user" })
    }

    return operation(user)
}

/**
 * Wraps a generic async operation (e.g. Drizzle query) and catches errors.
 * Caches DrizzleQueryErrors and ThrowableDalErrors, returning them as a failed DalReturn.
 */
export async function dalDbOperation<T>(operation: () => Promise<T>) {
    try {
        const data = await operation()
        return createSuccessReturn(data)
    } catch (e) {
        if (e instanceof ThrowableDalError) {
            return createErrorReturn(e.dalError)
        }
        if (e instanceof DrizzleQueryError) {
            return createErrorReturn({ type: "drizzle-error", error: e })
        }
        return createErrorReturn({ type: "unknown-error", error: e })
    }
}

/**
 * Converts a DalError into a user-friendly error message string.
 */
export function dalFormatErrorMessage(error: DalError) {
    const type = error.type

    switch (error.type) {
        case "no-user":
            return "You must be logged in to perform this action."
        case "no-access":
            return "You do not have permission to perform this action."
        case "drizzle-error":
            return `A database error occurred`
        case "unknown-error":
            return `An unknown error occurred`
        default:
            throw new Error(`Unhandled error type: ${type as never}`)
    }
}
