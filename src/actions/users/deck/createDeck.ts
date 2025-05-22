"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";
import { Deck } from "@/types";

async function createDeck(id: string, deck: Deck) {
  try {
    await db();

    const currentUser = await Users.findById(id);

    currentUser.decks.push(deck);

    await currentUser.save();
  } catch (e) {
    throw new Error(`failed to create deck ${(e as Error).message}`);
  }
  revalidatePath("/profile/[userId]/decks", "page");
  return { success: true };
}

export default createDeck;
