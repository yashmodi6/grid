"use client";

import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { GoogleIcon } from "@/icons/GoogleIcon";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        {/* HEADER */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>

        {/* EMAIL */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="something@example.com" required />
        </Field>

        {/* PASSWORD */}
        <Field>
          <div className="flex items-center mb-1">
            <FieldLabel htmlFor="password">Password</FieldLabel>

            {/* FORGOT PASSWORD LINK */}
            <Link
              href="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline text-muted-foreground">
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              className="pr-10"
            />

            {/* TOGGLE BUTTON*/}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute inset-y-0 right-0 text-muted-foreground hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </Field>

        {/* SUBMIT BUTTON */}
        <Field>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </Field>

        {/* DIVIDER */}
        <FieldSeparator>Or continue with</FieldSeparator>

        {/* GOOGLE LOGIN */}
        <Field>
          <Button type="button" variant="outline" className="w-full flex items-center gap-2">
            <GoogleIcon className="w-5 h-5" />
            Login with Google
          </Button>

          {/* SIGN UP */}
          <FieldDescription className="text-center text-sm mt-2">
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
