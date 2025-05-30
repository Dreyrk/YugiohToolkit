"use client";

import { useState } from "react";
import AddCardBtn from "../AddCardBtn";
import AddToDeckModal from "../AddToDeckModal";
import { YugiCards } from "@/types";
import YugiCard from "../cards/YugiCard";
import useDeckContext from "@/context/DeckContext";

export default function MainDeck({ isMounted }: { isMounted: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const { deck } = useDeckContext();

  return (
    <section className="main-deck">
      <div className="deck-display">
        {isMounted &&
          deck.main &&
          deck.main.map((card: YugiCards, i: number) => (
            <YugiCard deckType="main" inDeck={true} card={card} key={card.id + i} />
          ))}
        <AddCardBtn setIsOpen={setIsOpen} />
      </div>
      {isOpen && <AddToDeckModal isOpen={isOpen} setIsOpen={setIsOpen} deckType="main" />}
    </section>
  );
}
