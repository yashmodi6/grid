"use client";

import {useRouter} from "next/navigation";
import Link from "next/link";

import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {loginSchema, type LoginValues} from "../schemas/loginSchema";
import {authClient} from "@/lib/auth-client";

import {toast} from "sonner";
import {Button} from "@/components/ui/button";
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
import {LoadingSwap} from "@/components/ui/loading-swap";

export function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {isSubmitting} = form.formState;

  async function onSubmit({email, password}: LoginValues) {
    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/dashboard",
      },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed To Log In");
        },
        onSuccess: () => {
          toast.success("Successfully Logged In");
          router.push("/dashboard");
        },
      }
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <FieldGroup disabled={isSubmitting}>
        {/* Header */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
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

        {/* Password */}
        <Controller
          name="password"
          control={form.control}
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center">
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Link href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </Link>
              </div>

              <PasswordInput
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Login Button with LoadingSwap */}
        <Field>
          <Button type="submit" className="relative w-full" disabled={isSubmitting}>
            <LoadingSwap isLoading={isSubmitting} className="flex justify-center">
              Log In
            </LoadingSwap>
          </Button>
        </Field>

        {/* Divider */}
        <FieldSeparator>Or continue with</FieldSeparator>

        {/* Google Login */}
        <Field>
          <GoogleOAuthButton disabled={isSubmitting} />

          <FieldDescription className="mt-2 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
