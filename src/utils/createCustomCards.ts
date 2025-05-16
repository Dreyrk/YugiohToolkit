import { YugiCards, FetchedCards, CardPrices } from "../types/index";

function getAvgPrice(prices: CardPrices): any {
  const currentPrice: any = Object.values(prices);

  const avg: number =
    currentPrice
      .map((el: string) => parseFloat(el))
      .reduce(
        (prev: number, curr: number): number =>
          (prev as number) + (curr as number)
      ) / parseFloat(currentPrice.length);

  return avg.toFixed(2);
}

function createCustomCards(cards: FetchedCards[], deckType?: string) {
  const cleanCards = cards.map((card: FetchedCards): YugiCards => {
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
