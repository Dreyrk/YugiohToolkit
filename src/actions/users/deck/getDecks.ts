"use server";

import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";

async function getDecks(id: string) {
  try {
    await db();
    const currentUser = await Users.findById(id).select("decks");
    if (currentUser.decks.length) {
      return currentUser.decks;
    } else {
      return { message: "Pas de deck" };
    }
  } catch (e) {
    throw new Error(`failed to get decks from user ${id}: ${(e as Error).message}`);
  }
}

export default getDecks;
