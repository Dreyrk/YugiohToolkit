"use client";

import { useReducer, useMemo, ReactNode } from "react";
import { Deck } from "@/types";
import { DeckContext } from "./DeckContext";
import { deckReducer } from "./DeckContextProvider";

export const DeckEditorProvider = ({ children, initialDeck }: { children: ReactNode; initialDeck: Deck }) => {
  const [deck, dispatch] = useReducer(deckReducer, initialDeck);

  const contextValue = useMemo(
    () => ({
      deck,
      dispatch,
      initialDeck,
    }),
    [deck, dispatch, initialDeck]
  );

  return <DeckContext.Provider value={contextValue}>{children}</DeckContext.Provider>;
};
