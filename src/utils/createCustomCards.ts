import { YugiCards, FetchedCards, CardPrices } from "../types/index";

function getAvgPrice(prices: CardPrices): number {
  const currentPrices = Object.values(prices);

  const sum = currentPrices.map((price) => parseFloat(price)).reduce((prev, curr) => prev + curr, 0);

  const avg = sum / currentPrices.length;

  return parseFloat(avg.toFixed(2));
}

function createCustomCards(cards: FetchedCards[], deckType: string | null): YugiCards[] {
  const cleanCards: YugiCards[] = cards.map((card) => {
    return {
      id: card.id,
      name: card.name,
      type: card.type,
      desc: card.desc,
      atk: card.atk,
      def: card.def,
      level: card.level,
      race: card.race,
      attribute: card.attribute,
      img: card.card_images[0].image_url,
      price: getAvgPrice(card.card_prices[0]),
      deckType,
    };
  });
  return cleanCards;
}

export default createCustomCards;
