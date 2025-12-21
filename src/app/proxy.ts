import {NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";
import {auth} from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // THIS IS NOT SECURE!
  // This is an optimistic check and not full secure guarantee
  // Handle auth checks in each route for now..
  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"], // Specify the routes the middleware applies to
};
