"use server";

import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";
import { YugiCards } from "@/types";
import { getSession } from "../auth/getSession";

async function removeFavCard(card: YugiCards) {
  try {
    await db();

    const session = await getSession();

    if (!session.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const currentUser = await Users.findById(session.user.id).select("favs");

    currentUser.favs = currentUser.favs.filter((currCard: YugiCards) => currCard.id !== card.id);

    await currentUser.save();

    return { success: true };
  } catch (e) {
    return { success: false, error: `Failed to remove favorite card : ${(e as Error).message}` };
  }
}

export default removeFavCard;
