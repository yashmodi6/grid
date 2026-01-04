"use client";

import Link from "next/link";

import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

import {authClient} from "@/shared/lib/auth/auth-client";
import {toast} from "sonner";

import {Button} from "@/shared/ui/button";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/shared/ui/field";
import {Input} from "@/shared/ui/input";
import {LoadingSwap} from "@/shared/ui/loading-swap";

/* ---------------- Schema ---------------- */

const forgotPasswordSchema = z.object({
  email: z.email("Enter a valid email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

/* ---------------- Component ---------------- */

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {isSubmitting} = form.formState;

  async function onSubmit({email}: ForgotPasswordValues) {
    await authClient.requestPasswordReset(
      {
        email,
        redirectTo: "/reset-password",
      },
      {
        onSuccess: () => {
          toast.success("Password reset link sent");
        },
        onError: (error) => {
          toast.error(error.error.message || "Failed to send reset link");
        },
      }
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <FieldGroup disabled={isSubmitting}>
        {/* Header */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Forgot password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email to reset your password.
          </p>
        </div>

        {/* Email */}
        <Controller
          name="email"
          control={form.control}
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>

              <Input
                {...field}
                id={field.name}
                type="email"
                placeholder="m@example.com"
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Submit */}
        <Field>
          <Button type="submit" className="relative w-full" disabled={isSubmitting}>
            <LoadingSwap isLoading={isSubmitting} className="flex justify-center">
              Send reset link
            </LoadingSwap>
          </Button>
        </Field>

        {/* Back to login (same style as login links) */}
        <Field>
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Remembered your password?{" "}
              <Link href="/login" className="hover:text-foreground underline underline-offset-4">
                Go back
              </Link>
            </p>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}
