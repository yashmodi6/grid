"use client";

import {useRouter} from "next/navigation";
import {useSearchParams} from "next/navigation";

import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {resetPasswordSchema, type ResetPasswordValues} from "../schemas/resetPasswordSchema";
import {authClient} from "@/lib/auth-client";

import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {PasswordInput} from "./password-input";
import {LoadingSwap} from "@/components/ui/loading-swap";

export function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const error = searchParams.get("error");
    const form = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    });

    const {isSubmitting} = form.formState;

    async function onSubmit({password}: ResetPasswordValues) {
        await authClient.resetPassword(
            {
                newPassword: password,
                token
            },
            {
                onError: (error) => {
                    toast.error(error.error.message || "Failed to reset password.");
                },
                onSuccess: () => {
                    toast.success("Password changed", {
                        description: "Redirecting to Login Page"
                    });

                    setTimeout(() => {
                        router.push("/login");
                    }, 1500); // 1.5s
                }
            }
        );
    }

    if (token == null || error != null) {
        return null;
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
            <FieldGroup disabled={isSubmitting}>
                {/* Header */}
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Reset your password</h1>
                    <p className="text-muted-foreground text-sm">Enter a new password for your account</p>
                </div>

                {/* New Password */}
                <Controller
                    name="password"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>New password</FieldLabel>

                            <PasswordInput
                                {...field}
                                id={field.name}
                                disabled={isSubmitting}
                                aria-invalid={fieldState.invalid}
                                showToggle={false}
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                {/* Confirm Password */}
                <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Confirm password</FieldLabel>

                            <PasswordInput
                                {...field}
                                id={field.name}
                                disabled={isSubmitting}
                                aria-invalid={fieldState.invalid}
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                {/* Submit */}
                <Field>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        <LoadingSwap isLoading={isSubmitting}>Reset password</LoadingSwap>
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    );
}
