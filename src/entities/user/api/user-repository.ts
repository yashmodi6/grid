import { db } from "@/drizzle/db";
import { user } from "@/drizzle/schemas/auth-schema";
import { eq } from "drizzle-orm";
import { type UserDto } from "../model/dtos";
import { dalDbOperation, type DalReturn } from "@/shared/lib/dal";

export class UserRepository {
    static async getUserById(id: string): Promise<DalReturn<UserDto | undefined>> {
        return dalDbOperation(async () => {
            const result = await db.select().from(user).where(eq(user.id, id));
            return result[0];
        });
    }

    static async getUserByEmail(email: string): Promise<DalReturn<UserDto | undefined>> {
        return dalDbOperation(async () => {
            const result = await db.select().from(user).where(eq(user.email, email));
            return result[0];
        });
    }
}

