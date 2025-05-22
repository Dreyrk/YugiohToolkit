import { toast } from "react-toastify";
import { Deck } from "@/types";

const isDeckValid = (deck: Deck): boolean => {
  const { main, extra } = deck;

  const sameCards = deck.main.every((card, i, deck) => {
    const occurences = deck.filter((otherCard) => otherCard.name === card.name).length;
    return occurences <= 3;
  });

  if (sameCards)
    if (!deck.name) {
      toast.warn("Le deck n'a pas de nom");
      return false;
    }

  if (main.length <= 40 || main.length >= 60) {
    toast.warn("Le main deck doit être compris entre 40 et 60 cartes");
    return false;
  }

  if (extra.length > 15) {
    toast.warn("Extra deck: 15 cartes max");
    return false;
  }

  return true;
};

export default isDeckValid;
