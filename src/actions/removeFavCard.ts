"use server";

import { connect } from "@/lib/dbConnection";
import Users from "@/models/usersModel";
import { YugiCards } from "@/types";
import { revalidatePath } from "next/cache";

async function removeFavCard(userId: string, card: YugiCards) {
  try {
    await connect();

    const currentUser = await Users.findById(userId);

    currentUser.favs = currentUser.favs.filter(
      (currCard: YugiCards) => currCard.id !== card.id
    );
    await currentUser.save();
  } catch (e: any) {
    throw new Error(`Failed to remove favorite card : ${e.message}`);
  }
}

export default removeFavCard;
