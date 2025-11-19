"use client";

import { useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { GoogleIcon } from "@/icons/GoogleIcon";
import { Eye, EyeOff } from "lucide-react";
import { KeyboardStatus } from "@/components/KeyboardStatus";
import { handleFormNavigation } from "@/utils/handleFormNavigation";
import { useKeyboardStatus } from "@/hooks/useKeyboardStatus";

//
// -----------------------
// Validation Schema
// -----------------------
const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

type SignUpValues = z.infer<typeof signUpSchema>;

//
// -----------------------
// Component
// -----------------------
export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const { keyboardInfo, handleKeyboardState, resetKeyboardState } = useKeyboardStatus();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignUpValues) {
    console.log("Sign up values:", values);

    // simulate network request
    await new Promise((resolve) => setTimeout(resolve, 9000000));

    // then redirect / toast / supabase action here
  }

  return (
    <form
      className="flex flex-col gap-6"
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
      onKeyDown={(e) => handleFormNavigation(e, () => form.handleSubmit(onSubmit)())}>
      <FieldGroup className="gap-5">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm">Enter your details to get started</p>
        </div>

        {/* Name */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                {...field}
                id="name"
                placeholder="John Doe"
                aria-invalid={fieldState.invalid}
                autoFocus
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="you@example.com"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>

                <KeyboardStatus
                  focused={isPasswordFocused}
                  caps={keyboardInfo.caps}
                  num={keyboardInfo.num}
                />
              </div>

              <div className="relative mt-1">
                <Input
                  {...field}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-10"
                  aria-invalid={fieldState.invalid}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => {
                    field.onBlur();
                    setIsPasswordFocused(false);
                    resetKeyboardState();
                  }}
                  onKeyDown={handleKeyboardState}
                  onKeyUp={handleKeyboardState}
                />

                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute inset-y-0 right-0 hover:bg-transparent"
                  onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>

              {!fieldState.invalid && isPasswordFocused && (
                <FieldDescription className="text-xs">
                  Must include uppercase, lowercase, number, and at least 8 characters.
                </FieldDescription>
              )}

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Submit Button */}
        <Field orientation="vertical">
          <Button
            className="flex w-full items-center justify-center gap-2"
            type="submit"
            disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Spinner className="h-4 w-4" />}
            {form.formState.isSubmitting ? "Signing Up..." : "Sign Up"}
          </Button>

          <FieldDescription className="text-muted-foreground text-xs">
            By continuing, you agree to our{" "}
            <Link href="/terms-of-service" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="underline">
              Privacy Policy
            </Link>
            .
          </FieldDescription>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        {/* Google Sign Up */}
        <Field>
          <Button type="button" variant="outline" className="flex w-full items-center gap-2">
            <GoogleIcon className="h-5 w-5" />
            Sign Up with Google
          </Button>

          <FieldDescription className="mt-2 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Log In
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
