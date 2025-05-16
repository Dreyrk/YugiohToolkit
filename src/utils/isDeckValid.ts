import { toast } from "react-toastify";
import { Deck } from "@/types";

const isDeckValid = (deck: Deck): boolean => {
  const { main, extra } = deck;

  const totalCards: number = main.length + extra.length;

  const sameCards = deck.main.every((card, i, deck) => {
    const occurences = deck.filter(
      (otherCard) => otherCard.name === card.name
    ).length;
    return occurences <= 3;
  });

  if (sameCards)
    if (!deck.name) {
      toast.warn("You must provide a deck name");
      return false;
    }

  if (totalCards < 40 || totalCards > 60) {
    toast.warn("Deck must contain between 40 and 60 cards");
    return false;
  }

  if (extra.length > 15) {
    toast.warn("Extra Deck cannot contain more than 15 cards");
    return false;
  }

  return true;
};

export default isDeckValid;
