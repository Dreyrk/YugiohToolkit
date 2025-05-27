"use client";

import { useState } from "react";
import AddCardBtn from "../AddCardBtn";
import AddToDeckModal from "../AddToDeckModal";
import { YugiCards } from "@/types";
import YugiCard from "../cards/YugiCard";
import useDeckContext from "@/context/DeckContext";

export default function SideDeck({ isMounted }: { isMounted: boolean }) {
  const { deck } = useDeckContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="side-deck">
      <div className="deck-display">
        {isMounted &&
          deck.side &&
          deck.side.map((card: YugiCards, i: number) => (
            <YugiCard card={card} deckType="side" inDeck={true} key={card.id + i} />
          ))}
        <AddCardBtn setIsOpen={setIsOpen} />
      </div>
      {isOpen && <AddToDeckModal isOpen={isOpen} setIsOpen={setIsOpen} deckType="side" />}
    </section>
  );
}
