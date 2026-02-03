import { getCurrentUser } from "@/shared/lib/auth/get-current-user";
import { redirect } from "next/navigation";

import { UserRepository, type UserDto } from "@/entities/user";
import { dalVerifySuccess } from "@/shared/lib/dal";

/**
 * User MUST be logged in.
 * Redirects to /login if not authenticated.
 */
export const requireAuth = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return { user }; // Return shape compatible with session.user access
};

/**
 * User MUST NOT be logged in.
 * Redirects to /dashboard if authenticated.
 */
export const requireUnAuth = async () => {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return null;
};



export const requireUser = async (): Promise<UserDto> => {
  const { user: sessionUser } = await requireAuth();
  const userResult = await UserRepository.getUserById(sessionUser.id);
  const user = dalVerifySuccess(userResult);

  if (!user) {
    redirect("/login");
  }

  return user;
};
