"use client";

import useDeckContext from "@/context/DeckContext";
import { FaMinusCircle } from "react-icons/fa";

export default function RemoveCardBtn({ cardId, deckType }: { cardId: number; deckType: string }) {
  const { dispatch } = useDeckContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (deckType === "main" || deckType === "extra" || deckType === "side") {
      dispatch({
        type: "REMOVE_CARD",
        payload: { cardId, deckType },
      });
    } else {
      console.error("no deck type in remove btn");
    }
  };

  return (
    <button onClick={handleClick} className="absolute top-1 right-3" type="button">
      <FaMinusCircle size={30} color="#bf0603" />
    </button>
  );
}
