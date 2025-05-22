"use server";

import db from "@/lib/database/db";
import Cards from "@/lib/database/models/cards.model";

async function getCardsById(id: string) {
  try {
    await db();

    const card = await Cards.findById(id);

    return card;
  } catch (e) {
    console.error((e as Error).message);
  }
}

export default getCardsById;
