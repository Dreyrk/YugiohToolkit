"use server";

import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";
import { User } from "@/types";

export default async function getUserPseudo(userId: string): Promise<string> {
  try {
    await db();

    const user: User | null = await Users.findById(userId);

    return user ? user.pseudo : "";
  } catch (e) {
    throw new Error(`Cannot get user pseudo: ${(e as Error).message}`);
  }
}
