"use server";

import { connect } from "@/lib/dbConnection";
import Users from "@/models/usersModel";
import { Deck } from "@/types";
import isDeckValid from "@/utils/isDeckValid";
import { revalidatePath } from "next/cache";

async function createUserDeck(id: string, deck: Deck) {
  try {
    if (isDeckValid(deck)) {
      connect();

      const currentUser = await Users.findById(id);

      currentUser.decks.push(deck);

      await currentUser.save();
    } else {
      console.error("deck is not valid");
      return null;
    }
  } catch (e: any) {
    throw new Error(`failed to create deck ${e.message}`);
  }
  revalidatePath("/profile/[userId]/decks", "page");
}

export default createUserDeck;
