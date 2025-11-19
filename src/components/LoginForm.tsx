"use client";

import { useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Eye, EyeOff } from "lucide-react";
import { GoogleIcon } from "@/icons/GoogleIcon";
import { handleFormNavigation } from "@/utils/handleFormNavigation";
import { useKeyboardStatus } from "@/hooks/useKeyboardStatus";
import { KeyboardStatus } from "@/components/KeyboardStatus";

//
// -----------------------
// Validation Schema
// -----------------------
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

//
// -----------------------
// Component
// -----------------------
export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const { keyboardInfo, handleKeyboardState, resetKeyboardState } =
    useKeyboardStatus();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginValues) {
    console.log("Login values:", values);
  }

  return (
    <form
      className="flex flex-col gap-6"
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
      onKeyDown={(e) =>
        handleFormNavigation(e, () => form.handleSubmit(onSubmit)())
      }
    >
      <FieldGroup>
        {/* Header */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-muted-foreground text-balance">
            Enter your email below to login to your account
          </p>
        </div>

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
                placeholder="something@example.com"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {/* Label + forgot link */}
              <div className="mb-1 flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>

                <Link
                  href="/forgot-password"
                  className="ml-auto text-sm text-muted-foreground underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Password field with toggle */}
              <div className="relative">
                <Input
                  {...field}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  aria-invalid={fieldState.invalid}
                  className="pr-10"
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => {
                    setIsPasswordFocused(false);
                    resetKeyboardState();
                    field.onBlur();
                  }}
                  onKeyDown={handleKeyboardState}
                  onKeyUp={handleKeyboardState}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute inset-y-0 right-0 text-muted-foreground hover:bg-transparent"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Keyboard status */}
              <KeyboardStatus
                focused={isPasswordFocused}
                caps={keyboardInfo.caps}
                num={keyboardInfo.num}
                shift={keyboardInfo.shift}
              />

              {/* Validation errors */}
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* Submit */}
        <Field>
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        {/* Google login */}
        <Field>
          <Button
            type="button"
            variant="outline"
            className="flex w-full items-center gap-2"
          >
            <GoogleIcon className="h-5 w-5" />
            Login with Google
          </Button>

          <FieldDescription className="mt-2 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="underline underline-offset-4"
            >
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}