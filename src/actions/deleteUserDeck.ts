"use server";

import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";
import { Types } from "mongoose";
import { toast } from "react-toastify";

async function deleteUserDeck(userId: string, deckId: string) {
  try {
    const userObjId = new Types.ObjectId(userId);
    const deckObjId = new Types.ObjectId(deckId);
    await db();

    const results = await Users.updateOne({ _id: userObjId }, { $pull: { decks: { _id: deckObjId } } });

    if (results.modifiedCount === 1) {
      toast.success("Deck Deleted !");
    } else {
      toast.error("Something goes wrong...");
    }
  } catch (e) {
    throw new Error(`Cannot delete ${userId} deck (${deckId}): ${(e as Error).message}`);
  }
}

export default deleteUserDeck;
