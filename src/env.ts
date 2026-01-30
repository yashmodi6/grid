import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
    // Database
    DATABASE_URL: z.url(),

    // Authentication (Better Auth)
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.url(),

    // Google OAuth
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),

    // Mail
    NODEMAILER_USER: z.email(),
    NODEMAILER_APP_PASSWORD: z.string().min(1),
    NODEMAILER_SMTP_HOST: z.string().min(1),
    NODEMAILER_SMTP_PORT: z.string().transform((val) => parseInt(val, 10)),

    // Email Meta
    SUPPORT_EMAIL: z.email(),
});

export const env = envSchema.parse(process.env);
