import { auth } from "@/shared/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserRepository, type UserDto } from "@/entities/user";

/**
 * User MUST be logged in.
 * Redirects to /login if not authenticated.
 */
export const requireAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return session;
};

/**
 * User MUST NOT be logged in.
 * Redirects to /dashboard if authenticated.
 */
export const requireUnAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return null;
};



export const requireUser = async (): Promise<UserDto> => {
  const session = await requireAuth();
  const user = await UserRepository.getUserById(session.user.id);

  if (!user) {
    redirect("/login");
  }

  return user;
};
