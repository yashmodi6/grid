"use client";

import { useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Eye, EyeOff } from "lucide-react";

import { signUpSchema, SignUpValues } from "@/features/auth/schemas/signUpSchema";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      termsAccepted: false,
    },
  });

  async function onSubmit(values: SignUpValues) {
    console.log("Sign up values:", values);

    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  return (
    <form className="flex flex-col gap-6" noValidate onSubmit={form.handleSubmit(onSubmit)}>
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
              </div>

              <div className="relative mt-1">
                <Input
                  {...field}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-10"
                  aria-invalid={fieldState.invalid}
                  onBlur={field.onBlur}
                />

                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground absolute inset-y-0 right-0 hover:bg-transparent"
                  onClick={() => setShowPassword(prev => !prev)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>

              {!fieldState.invalid && (
                <FieldDescription className="text-xs">
                  Must include uppercase, lowercase, number, and at least 8 characters.
                </FieldDescription>
              )}

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Terms Checkbox */}
        <Controller
          name="termsAccepted"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="mt-2">
              <div className="flex gap-3 items-start w-full">
                <Checkbox
                  id="termsAccepted"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />

                <Label
                  htmlFor="termsAccepted"
                  className=" block text-xs text-muted-foreground leading-normal">
                  By continuing, you agree to our{" "}
                  <Link href="/terms-of-service" className="underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="underline">
                    Privacy Policy
                  </Link>
                  .
                </Label>
              </div>

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
