"use client";
import { useEffect, useMemo, useReducer } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Deck, DeckAction, YugiCards } from "@/types";
import { DeckContext } from "./DeckContext";

const emptyDeck = {
  id: "",
  name: "",
  main: [],
  extra: [],
  side: [],
};

function deckReducer(deck: Deck, action: DeckAction): Deck {
  switch (action.type) {
    case "RESET":
      return { ...emptyDeck };

    case "CHANGE_NAME": {
      const { name } = action.payload;
      return { ...deck, name };
    }

    case "ADD_CARD": {
      const { cards, deckType } = action.payload;
      if (!["main", "extra", "side"].includes(deckType)) {
        return deck;
      }
      return { ...deck, [deckType]: [...deck[deckType], ...cards] };
    }

    case "REMOVE_CARD": {
      const { cardId, deckType: deckTypeToRemove } = action.payload;
      if (!["main", "extra", "side"].includes(deckTypeToRemove)) return deck;

      const indexOfCardToRemove = deck[deckTypeToRemove].findIndex((card: YugiCards) => card.id === cardId);
      if (indexOfCardToRemove === -1) return deck;

      const updatedDeck = [...deck[deckTypeToRemove]];
      updatedDeck.splice(indexOfCardToRemove, 1);

      return {
        ...deck,
        [deckTypeToRemove]: updatedDeck,
      };
    }

    default:
      return deck;
  }
}

export default function DeckContextProvider({ children }: { children: React.ReactNode }) {
  const [getStoredDeck, setStoredDeck] = useLocalStorage<Deck | null>("deck");

  const storedDeck = getStoredDeck();

  const [deck, dispatch] = useReducer(deckReducer, storedDeck || emptyDeck);

  const contextValue = useMemo(() => {
    return { deck, dispatch };
  }, [deck, dispatch]);

  useEffect(() => {
    setStoredDeck(deck);
  }, [deck, setStoredDeck]);

  return <DeckContext.Provider value={contextValue}>{children}</DeckContext.Provider>;
}
