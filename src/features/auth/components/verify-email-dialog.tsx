"use client";

import {useEffect, useRef, useState} from "react";
import {MailCheck} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {authClient} from "@/shared/lib/auth/auth-client";

type VerifyEmailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
};

const RESEND_COOLDOWN = 120; // seconds

export function VerifyEmailDialog({open, onOpenChange, email}: VerifyEmailDialogProps) {
  const [secondsLeft, setSecondsLeft] = useState(RESEND_COOLDOWN);
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!open) return;

    startCountdown(RESEND_COOLDOWN);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [open]);

  function startCountdown(time = RESEND_COOLDOWN) {
    setSecondsLeft(time);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setSecondsLeft((t) => {
        const next = t - 1;
        if (next <= 0) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return next;
      });
    }, 1000);
  }

  const canResend = secondsLeft === 0;

  async function resendVerificationEmail() {
    setLoading(true);
    startCountdown();

    try {
      await authClient.sendVerificationEmail({
        email,
        callbackURL: "/dashbaord",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border border border-2 sm:max-w-md">
        <DialogHeader className="flex flex-col items-center gap-2 text-center">
          <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
            <MailCheck className="text-primary h-6 w-6" />
          </div>

          <DialogTitle className="text-xl">Check your email</DialogTitle>

          <DialogDescription className="text-muted-foreground text-sm">
            We’ve sent a confirmation link to
            <span className="text-foreground mt-1 block font-medium">{email}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="text-muted-foreground mt-4 text-center text-sm">
          Click the link in the email to verify your account and then reload this page.
          <br />
          If you don’t see it, check your spam folder.
        </div>

        {/* Resend */}
        <div className="mt-6 flex justify-center">
          <Button
            disabled={!canResend || loading}
            onClick={resendVerificationEmail}
            className="flex w-full max-w-sm items-center justify-center gap-2 px-4">
            <span>{loading ? "Sending..." : "Resend verification email"}</span>

            {!canResend && (
              <span className="text-muted-foreground text-xs">
                {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, "0")}
              </span>
            )}
          </Button>
        </div>

        {/* Wrong email */}
        <div className="mt-4 text-center">
          <Button
            variant="link"
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground">
            Wrong email? Enter again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
