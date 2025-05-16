"use server";

import createCustomCards from "../utils/createCustomCards";

async function getCardsById(id: string) {
  try {
    const res = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`
    );

    if (res.ok) {
      const data = await res.json();

      const cards = createCustomCards(data.data);

      return cards[0];
    } else {
      console.error("failed to fetch");
    }
  } catch (e: any) {
    console.error(e.message);
  }
}

export default getCardsById;
