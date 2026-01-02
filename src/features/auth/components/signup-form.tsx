"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";

import {authClient} from "@/lib/auth-client";
import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signUpSchema, type SignUpValues} from "../schemas/signUpSchema";

import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {PasswordInput} from "./password-input";
import {GoogleOAuthButton} from "./google-oauth-button";
import {VerifyEmailDialog} from "./verify-email-dialog";
import {Checkbox} from "@/components/ui/checkbox";
import {LoadingSwap} from "@/components/ui/loading-swap";

export function SignUpForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState<string | null>(null);
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      terms: false,
    },
  });

  const {isSubmitting} = form.formState;

  async function onSubmit({email, password}: SignUpValues) {
    const name = email.split("@")[0];

    await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/dashboard",
      },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed To Sign Up");
        },
        onSuccess: () => {
          toast.success("Please Verify Your Email");
          setVerifyEmail(email);
          setOpen(true);
        },
      }
    );
  }

  return (
    <>
      {open && verifyEmail && (
        <VerifyEmailDialog open={open} onOpenChange={setOpen} email={verifyEmail ?? ""} />
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
        <FieldGroup disabled={isSubmitting}>
          {/* Header */}
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your details below to create your account
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
                  placeholder="m@example.com"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  disabled={isSubmitting}
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={form.control}
            render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                <PasswordInput
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  disabled={isSubmitting}
                />

                {!fieldState.invalid && (
                  <FieldDescription className="text-xs">
                    At least 8 characters, with uppercase, lowercase, number, and symbol.
                  </FieldDescription>
                )}

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Terms */}
          <Controller
            name="terms"
            control={form.control}
            render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                  />

                  <label htmlFor="terms" className="text-muted-foreground text-xs leading-tight">
                    I agree to the{" "}
                    <Link href="#" className="underline underline-offset-4">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="underline underline-offset-4">
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Signup Button with LoadingSwap */}
          <Field>
            <Button type="submit" className="relative w-full" disabled={isSubmitting}>
              <LoadingSwap isLoading={isSubmitting} className="flex justify-center">
                Create Account
              </LoadingSwap>
            </Button>
          </Field>

          {/* Divider */}
          <FieldSeparator>Or continue with</FieldSeparator>

          {/* Google Signup */}
          <Field>
            <GoogleOAuthButton disabled={isSubmitting} />

            <FieldDescription className="mt-2 text-center">
              Already have an account?{" "}
              <Link href="/" className="underline underline-offset-4">
                Login
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}
