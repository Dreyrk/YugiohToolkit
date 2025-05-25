"use server";

import { getSession } from "@/actions/auth/getSession";
import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";
import { CollectionYugiCard } from "@/types";

export async function addCardsToCollection(collectionId: string, cards: CollectionYugiCard[]) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    await db();

    const user = await Users.findById(session.user.id);
    if (!user) {
      return { error: "User not found" };
    }

    const collection = user.collections.id(collectionId);
    if (!collection) {
      return { error: "Collection not found" };
    }

    collection.cards.push(...cards);
    await user.save();

    return { success: true };
  } catch (e) {
    console.error("Error adding cards to collection:", e);
    return { error: `Cannot add cards: ${(e as Error).message}` };
  }
}
