import { db } from "@/drizzle/db";
import { user } from "@/drizzle/schemas/auth-schema";
import { eq } from "drizzle-orm";
import { type UserDto } from "../model/dtos";

export class UserRepository {
    static async getUserById(id: string): Promise<UserDto | undefined> {
        const result = await db.select().from(user).where(eq(user.id, id));
        return result[0];
    }

    static async getUserByEmail(email: string): Promise<UserDto | undefined> {
        const result = await db.select().from(user).where(eq(user.email, email));
        return result[0];
    }
}
