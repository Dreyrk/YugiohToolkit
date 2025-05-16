import { YugiCards } from "@/types";

export default function countCards(
  card: YugiCards,
  cards: YugiCards[]
): number {
  return cards.filter((currentCard: YugiCards) => currentCard.id === card.id)
    .length;
}
