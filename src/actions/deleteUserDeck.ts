"use server";

import { connect } from "@/lib/dbConnection";
import Users from "@/models/usersModel";
import { Types } from "mongoose";
import { toast } from "react-toastify";

async function deleteUserDeck(userId: string, deckId: string) {
  try {
    const userObjId = new Types.ObjectId(userId);
    const deckObjId = new Types.ObjectId(deckId);
    await connect();

    const results = await Users.updateOne(
      { _id: userObjId },
      { $pull: { decks: { _id: deckObjId } } }
    );

    if (results.modifiedCount === 1) {
      toast.success("Deck Deleted !");
    } else {
      toast.error("Something goes wrong...");
    }
  } catch (e: any) {
    throw new Error(`Cannot delete ${userId} deck (${deckId})`);
  }
}

export default deleteUserDeck;
