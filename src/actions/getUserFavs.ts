"use server";

import { connect } from "@/lib/dbConnection";
import Users from "@/models/usersModel";

async function getUserFavs(userId: string) {
  try {
    await connect();

    const currentUser = await Users.findById(userId).select("favs");

    if (currentUser.favs[0]) {
      return currentUser.favs;
    } else {
      return null;
    }
  } catch (e: any) {
    throw new Error(`failed to get user favs : ${e.message}`);
  }
}

export default getUserFavs;
