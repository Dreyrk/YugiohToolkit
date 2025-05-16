"use client";

import { useState } from "react";
import { YugiCardProps, YugiCards } from "@/types";
import Image from "next/image";
import RemoveCardBtn from "../RemoveCardBtn";
import countCards from "@/utils/countCards";

export default function YugiCard({
  card,
  inDeck = false,
  deckType = "none",
  selectedCards,
  setSelectedCards,
}: YugiCardProps) {
  const isSelected = selectedCards?.length ? countCards(card, selectedCards) : 0;
  const [selected, setSelected] = useState(isSelected);

  const selectCard = () => {
    if (selected < 3) {
      setSelectedCards((prev: YugiCards[]) => [...prev, card]);
      setSelected(selected + 1);
    } else {
      setSelectedCards((prev: YugiCards[]) => prev.filter((currentCard: YugiCards) => currentCard.id !== card.id));
      setSelected(0);
    }
  };

  return (
    <button onClick={selectCard} type="button" className="relative hover:scale-95">
      {inDeck && deckType && <RemoveCardBtn deckType={deckType} cardId={card.id} />}
      <span
        className={`${
          !selected && "hidden"
        } absolute top-[40%] left-[37%] z-50 bg-slate-200 rounded-full h-8 w-8 grid place-content-center font-semibold`}>
        {selected}
      </span>
      <Image className="z-40" src={card.img ? card.img : "/assets/cardBack.jpg"} alt="card" width={180} height={260} />
    </button>
  );
}
