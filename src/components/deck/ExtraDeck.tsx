"use client";

import { useState } from "react";
import AddToDeckModal from "../AddToDeckModal";
import AddCardBtn from "../AddCardBtn";
import { YugiCards } from "@/types";
import YugiCard from "../cards/YugiCard";
import useDeckContext from "@/context/DeckContext";

export default function ExtraDeck({ isMounted }: { isMounted: boolean }) {
  const { deck } = useDeckContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="extra-deck">
      <div className="deck-display">
        {isMounted &&
          deck.extra &&
          deck.extra.map((card: YugiCards, i: number) => (
            <YugiCard card={card} deckType="extra" inDeck={true} key={card.id + i} />
          ))}
        <AddCardBtn setIsOpen={setIsOpen} />
      </div>
      {isOpen && <AddToDeckModal isOpen={isOpen} setIsOpen={setIsOpen} deckType="extra" />}
    </section>
  );
}
