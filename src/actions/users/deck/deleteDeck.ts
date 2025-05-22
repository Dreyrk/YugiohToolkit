"use server";

import { Types } from "mongoose";
import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";

async function deleteDeck(userId: string, deckId: string) {
  try {
    const userObjId = new Types.ObjectId(userId);
    const deckObjId = new Types.ObjectId(deckId);
    await db();

    const results = await Users.updateOne({ _id: userObjId }, { $pull: { decks: { _id: deckObjId } } });

    if (results.modifiedCount === 1) {
      return { success: true, message: "Updated !" };
    } else {
      return { success: false, message: "Un problème est survenue" };
    }
  } catch (e) {
    throw new Error(`Cannot delete ${userId} deck (${deckId}): ${(e as Error).message}`);
  }
}

export default deleteDeck;
