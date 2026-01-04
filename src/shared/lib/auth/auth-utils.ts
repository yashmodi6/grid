import { auth } from "@/shared/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
