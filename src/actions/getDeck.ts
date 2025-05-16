"use server";

import { connect } from "@/lib/dbConnection";
import Users from "@/models/usersModel";
import { Deck } from "@/types";

async function getDeck(userId: string, deckId: string) {
  try {
    await connect();
    const currentUser = await Users.findById(userId);

    const currentUserDeck = currentUser.decks.find(
      (deck: Deck) => deck.id === deckId
    );

    return currentUserDeck;
  } catch (e: any) {
    throw new Error(`failed to get deck ${deckId} : ${e.message}`);
  }
}

export default getDeck;
