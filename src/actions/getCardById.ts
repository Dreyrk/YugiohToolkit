"use server";

import db from "@/lib/database/db";
import Cards from "@/lib/database/models/cards.model";

async function getCardsById(id: string) {
  try {
    await db();

    const card = await Cards.findById(id);

    const plainCardObject = JSON.parse(JSON.stringify(card));

    return plainCardObject;
  } catch (e) {
    console.error((e as Error).message);
  }
}

export default getCardsById;
