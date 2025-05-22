import { Deck } from "@/types";

function getDeckLength(deck: Deck): number {
  let deckLength = 0;

  const zones: (keyof Deck)[] = ["main", "extra", "side"];

  for (const zone of zones) {
    deckLength += deck[zone].length;
  }

  return deckLength;
}

export default getDeckLength;
