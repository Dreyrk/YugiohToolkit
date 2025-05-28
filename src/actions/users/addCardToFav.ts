"use server";

import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";
import { YugiCards } from "@/types";
import { getSession } from "../auth/getSession";

async function addCardToFav(card: YugiCards) {
  try {
    await db();

    const session = await getSession();

    if (!session.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const currentUser = await Users.findById(session.user.id).select("favs");

    await currentUser.favs.push(card);

    await currentUser.save();

    return { success: true };
  } catch (e) {
    throw new Error(`Failed to add card to fav : ${(e as Error).message}`);
  }
}

export default addCardToFav;
