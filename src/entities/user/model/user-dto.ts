import { type InferSelectModel } from "drizzle-orm";
import { user } from "@/shared/db/schema";

export type User = InferSelectModel<typeof user>;

export interface UserDTO {
    id: string;
    name: string;
    email: string;
    image: string | null;
}

export function toUserDTO(user: Pick<User, "id" | "name" | "email" | "image">): UserDTO {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
    };
}
