"use client";

import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { authClient } from "@/shared/lib/auth/auth-client";

export function GoogleOAuthButton({ disabled }: { disabled?: boolean }) {
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
      onClick={handleGoogleSignIn}
      disabled={disabled}>
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
