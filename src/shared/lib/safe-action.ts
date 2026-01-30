import { getAuthenticatedUserUseCase } from "@/entities/user/server/user-server";
import { UserDTO } from "@/entities/user/model/user-dto";

export type AuthenticatedActionFunction<T, R> = (
    data: T,
    user: UserDTO
) => Promise<R>;

/**
 * Wraps a server action with authentication protection.
 * @param action The server action to wrap.
 */
export function authenticatedAction<T, R>(
    action: AuthenticatedActionFunction<T, R>
) {
    return async (data: T): Promise<R> => {
        const user = await getAuthenticatedUserUseCase();
        return action(data, user);
    };
}
