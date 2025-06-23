"use client";

import { useState, useEffect } from "react";
import { YugiCardProps, YugiCards } from "@/types";
import Image from "next/image";
import RemoveCardBtn from "../RemoveCardBtn";
import countCards from "@/utils/countCards";
import { cn } from "@/lib/utils";

export default function YugiCard({
  card,
  inDeck = false,
  deckType = "none",
  selectedCards,
  setSelectedCards,
}: YugiCardProps) {
  const isSelected = selectedCards ? countCards(card, selectedCards) : 0;
  const [selected, setSelected] = useState(isSelected);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setSelected(selectedCards ? countCards(card, selectedCards) : 0);
  }, [selectedCards, card]);

  const selectCard = () => {
    if (!setSelectedCards) {
      return;
    }

    if (selected < 3) {
      setSelectedCards((prev: YugiCards[] = []) => [...prev, card]);
      setSelected(selected + 1);
    } else {
      setSelectedCards((prev: YugiCards[] = []) => prev.filter((currentCard: YugiCards) => currentCard.id !== card.id));
      setSelected(0);
    }
  };

  const isInteractive = isMounted && setSelectedCards;

  return (
    <div
      onClick={isInteractive ? selectCard : undefined}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      className={cn(`relative`, isInteractive ? "hover:scale-95 cursor-pointer" : "cursor-default")}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectCard();
              }
            }
          : undefined
      }>
      {inDeck && deckType && <RemoveCardBtn deckType={deckType} cardId={card.id} />}
      {isMounted && (
        <span
          className={`${
            !selected ? "hidden" : ""
          } absolute top-[40%] left-[37%] z-50 bg-neutral-950 text-slate-100 rounded-full h-8 w-8 grid place-content-center font-semibold`}>
          {selected}
        </span>
      )}
      <Image
        className="z-40"
        src={card.img}
        loading="lazy"
        placeholder="blur"
        blurDataURL="/assets/cardBack.jpg"
        alt="card"
        width={180}
        height={260}
      />
    </div>
  );
}
