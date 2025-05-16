"use server";

import { YugiCards } from "../types/index";
import createCustomCards from "../utils/createCustomCards";
import { MainDeckTypes, ExtraDeckTypes } from "@/constants";

const getUrl = (type: string) => {
  switch (type) {
    case "main":
      return `https://db.ygoprodeck.com/api/v7/cardinfo.php?language=fr&type=${MainDeckTypes.join(",")}`;
    case "extra":
      return `https://db.ygoprodeck.com/api/v7/cardinfo.php?language=fr&type=${ExtraDeckTypes.join(",")}`;
    case "side":
      return `https://db.ygoprodeck.com/api/v7/cardinfo.php?language=fr`;
    default:
      return "https://db.ygoprodeck.com/api/v7/cardinfo.php?language=fr";
  }
};

async function getCards(type: string) {
  try {
    const url = getUrl(type);
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();

      const cards: YugiCards[] = createCustomCards(data.data, type);

      return cards;
    }
  } catch (e: any) {
    console.error(e.message);
  }
}

export default getCards;
