"use server";

import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";
import { YugiCards } from "@/types";

async function removeFavCard(userId: string, card: YugiCards) {
  try {
    await db();

    const currentUser = await Users.findById(userId);

    currentUser.favs = currentUser.favs.filter((currCard: YugiCards) => currCard.id !== card.id);
    await currentUser.save();
  } catch (e) {
    throw new Error(`Failed to remove favorite card : ${(e as Error).message}`);
  }
}

export default removeFavCard;
