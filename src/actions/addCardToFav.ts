"use server";

import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";
import { YugiCards } from "@/types";

async function addCardToFav(userId: string, card: YugiCards) {
  try {
    await db();

    const currentUser = await Users.findById(userId).select("favs");

    await currentUser.favs.push(card);

    await currentUser.save();
  } catch (e) {
    throw new Error(`Failed to add card to fav : ${(e as Error).message}`);
  }
}

export default addCardToFav;
