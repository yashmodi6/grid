"use client";

import Image from "next/image";
import {Button} from "@/components/ui/button";
import {authClient} from "@/lib/auth-client";

export function GoogleOAuthButton() {
  async function handleGoogleSignIn() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  }

  return (
    <Button
      variant="outline"
      type="button"
      className="flex w-full items-center justify-center gap-3"
      onClick={handleGoogleSignIn}>
      <Image
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        width={20}
        height={20}
      />
      Continue with Google
    </Button>
  );
}
