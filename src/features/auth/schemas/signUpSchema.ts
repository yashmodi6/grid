import {z} from "zod";
import {passwordSchema} from "./passwordSchema";
export const signUpSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: passwordSchema,
  terms: z.boolean().refine((val) => val === true, "You must accept the terms & conditions."),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
