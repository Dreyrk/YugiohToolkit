import { createContext, useContext } from "react";
import { Deck, DeckAction } from "@/types";

interface DeckContextType {
  deck: Deck;
  dispatch: React.Dispatch<DeckAction>;
  initialDeck?: Deck;
}

export const DeckContext = createContext<DeckContextType>({
  deck: {
    id: "",
    name: "",
    main: [],
    extra: [],
    side: [],
  },
  dispatch: () => {},
});

const useDeckContext = () => {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error("useDeckContext must be used within a DeckContextProvider");
  }
  return context;
};

export default useDeckContext;
