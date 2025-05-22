"use server";

import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";

async function getUserFavs(userId: string) {
  try {
    await db();

    const currentUser = await Users.findById(userId).select("favs");

    if (currentUser.favs[0]) {
      return currentUser.favs;
    } else {
      return null;
    }
  } catch (e) {
    throw new Error(`failed to get user favs : ${(e as Error).message}`);
  }
}

export default getUserFavs;
