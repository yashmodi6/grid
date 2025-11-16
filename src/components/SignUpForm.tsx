"use client";

import Link from "next/link";
import { useState, useId } from "react";
import { cn } from "@/utils/cn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldDescription,
} from "@/components/ui/field";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

import { EyeIcon, EyeOffIcon, CheckIcon, XIcon } from "lucide-react";
import { GoogleIcon } from "@/icons/GoogleIcon";

import { getPasswordStrength } from "@/utils/passwordStrength";

/* --------------------------------------------------------------
   PASSWORD FIELD 
--------------------------------------------------------------- */
function PasswordField() {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const id = useId();
  const { score, requirements, barColor, label } = getPasswordStrength(password);

  return (
    <Field>
      <FieldLabel htmlFor={id}>Password</FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <div className="relative">
          <PopoverTrigger asChild>
            <Input
              id={id}
              type={visible ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setOpen(true)}
              onBlur={() => setOpen(false)}
              required
              className="pr-10"
            />
          </PopoverTrigger>

          {/* EYE TOGGLE */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground absolute inset-y-0 right-0 hover:bg-transparent"
            onClick={() => setVisible(!visible)}>
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
        </div>

        {/* PASSWORD POPOVER CONTENT */}
        <PopoverContent
          side="bottom"
          align="start"
          className="bg-popover w-[260px] rounded-md border p-4 shadow-md">
          {/* PROGRESS BAR */}
          <div className="mb-3 flex h-1 w-full gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-full flex-1 rounded-full transition-all",
                  i < score ? barColor : "bg-border"
                )}
              />
            ))}
          </div>

          {/* LABEL */}
          <p className="mb-2 text-sm font-medium">{label}</p>

          {/* REQUIREMENTS */}
          <ul className="space-y-1.5">
            {requirements.map((req, i) => (
              <li key={i} className="flex items-center gap-2">
                {req.met ? (
                  <CheckIcon className="size-4 text-green-600" />
                ) : (
                  <XIcon className="text-muted-foreground size-4" />
                )}

                <span
                  className={cn("text-xs", req.met ? "text-green-600" : "text-muted-foreground")}>
                  {req.text}
                </span>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </Field>
  );
}

/* --------------------------------------------------------------
   SIGN UP FORM
--------------------------------------------------------------- */

export function SignUpForm({ className, ...props }: React.ComponentProps<"form">) {
  const [confirmVisible, setConfirmVisible] = useState(false);

  return (
    <form className={cn("flex flex-col gap-4", className)} {...props}>
      <FieldGroup className="gap-5">
        {/* HEADER */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your details below to get started
          </p>
        </div>

        {/* FIRST + LAST NAME */}
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel>First Name</FieldLabel>
            <Input placeholder="John" required />
          </Field>

          <Field>
            <FieldLabel>Last Name</FieldLabel>
            <Input placeholder="Doe" required />
          </Field>
        </div>

        {/* EMAIL */}
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input type="email" placeholder="something@example.com" required />
        </Field>

        {/* PASSWORD + CONFIRM */}
        <div className="grid grid-cols-2 gap-3">
          {/* PASSWORD FIELD */}
          <PasswordField />

          {/* CONFIRM PASSWORD */}
          <Field>
            <FieldLabel>Confirm Password</FieldLabel>

            <div className="relative">
              <Input
                type={confirmVisible ? "text" : "password"}
                placeholder="••••••••"
                required
                className="pr-10"
              />

              {/* EYE TOGGLE */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-muted-foreground absolute inset-y-0 right-0 hover:bg-transparent"
                onClick={() => setConfirmVisible(!confirmVisible)}>
                {confirmVisible ? <EyeOffIcon /> : <EyeIcon />}
              </Button>
            </div>
          </Field>
        </div>

        {/* AGREEMENT CHECKBOX */}
        <div className="flex items-start gap-2">
          <Checkbox id="agree" required className="mt-1" />

          <Label
            htmlFor="agree"
            className="text-muted-foreground block cursor-pointer text-xs leading-snug">
            By continuing, you agree to our{" "}
            <Link href="/terms-of-service" className="underline underline-offset-4">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </Label>
        </div>

        {/* SUBMIT */}
        <Button type="submit" className="w-full">
          Sign Up
        </Button>

        <FieldSeparator>Or sign up with</FieldSeparator>

        {/* GOOGLE SIGN-IN */}
        <Button type="button" variant="outline" className="flex w-full items-center gap-2">
          <GoogleIcon className="h-5 w-5" />
          Sign up with Google
        </Button>

        <FieldDescription className="mt-2 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Login
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
