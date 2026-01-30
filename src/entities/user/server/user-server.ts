import { toUserDTO, UserDTO } from "../model/user-dto";
import { redirect } from "next/navigation";
import { getCachedSession } from "./user-cache";

/**
 * Policy: Enforce that a session exists.
 * Returns the authenticated user as a DTO.
 */
export async function getAuthenticatedUserUseCase(): Promise<UserDTO> {
    const session = await getCachedSession();

    if (!session || !session.user) {
        redirect("/login");
    }

    // Normalize image to be string | null (DB schema) instead of string | null | undefined (Auth schema)
    return toUserDTO({
        ...session.user,
        image: session.user.image ?? null,
    });
}
