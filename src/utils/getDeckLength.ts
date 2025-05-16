function getDeckLength(deck: any): number {
  let deckLength: number = 0;

  for (const deckType in deck) {
    if (Array.isArray(deck[deckType])) {
      deckLength += deck[deckType].length;
    }
  }
  return deckLength;
}

export default getDeckLength;
