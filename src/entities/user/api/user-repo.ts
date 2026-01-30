import { db } from "@/shared/db/db";
import { user } from "@/shared/db/schema";
import { eq, sql } from "drizzle-orm";

const getUserByIdPrepared = db
    .select()
    .from(user)
    .where(eq(user.id, sql.placeholder("id")))
    .prepare("get_user_by_id");

const getUserByEmailPrepared = db
    .select()
    .from(user)
    .where(eq(user.email, sql.placeholder("email")))
    .prepare("get_user_by_email");

export async function getUserById(userId: string) {
    const [dbUser] = await getUserByIdPrepared.execute({ id: userId });
    return dbUser || null;
}

export async function getUserByEmail(email: string) {
    const [dbUser] = await getUserByEmailPrepared.execute({ email });
    return dbUser || null;
}
