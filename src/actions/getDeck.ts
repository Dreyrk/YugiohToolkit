"use server";

import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";
import { Deck } from "@/types";

async function getDeck(userId: string, deckId: string) {
  try {
    await db();

    const currentUser = await Users.findById(userId);

    const currentUserDeck = currentUser.decks.find((deck: Deck) => deck.id === deckId);

    return currentUserDeck;
  } catch (e) {
    throw new Error(`failed to get deck ${deckId} : ${(e as Error).message}`);
  }
}

export default getDeck;
