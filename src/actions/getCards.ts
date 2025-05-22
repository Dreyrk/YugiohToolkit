"use server";

import db from "@/lib/database/db";
import Cards from "@/lib/database/models/cards.model";
import { YugiCards } from "../types/index";

export default async function getCards(type: string): Promise<YugiCards[] | null> {
  try {
    await db();

    let query: { deckType?: string | null | { $in: (string | null)[] } } = {};
    if (type === "main" || type === "extra") {
      query = { deckType: type };
    }

    const cards = await Cards.find(query).lean().select("-__v").exec();

    const formattedCards: YugiCards[] = cards.map((card) => ({
      id: card.id,
      name: card.name,
      type: card.type,
      desc: card.desc,
      atk: card.atk,
      def: card.def,
      level: card.level,
      race: card.race,
      attribute: card.attribute,
      img: card.img,
      price: card.price,
      deckType: card.deckType,
    }));
    return formattedCards;
  } catch (e) {
    console.error("Error fetching cards from database:", (e as Error).message);
    return null;
  }
}
