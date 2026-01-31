import { type InferSelectModel } from "drizzle-orm";
import { user } from "@/drizzle/schemas/auth-schema";

export type UserDto = InferSelectModel<typeof user>;

export type CreateUserDto = {
    name: string;
    email: string;
    image?: string;
    emailVerified?: boolean;
};
