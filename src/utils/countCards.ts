import { CollectionYugiCard, YugiCards } from "@/types";

export default function countCards(
  card: YugiCards | CollectionYugiCard,
  cards: YugiCards[] | CollectionYugiCard[]
): number {
  return cards.filter((currentCard: YugiCards | CollectionYugiCard) => currentCard.id === card.id).length;
}
