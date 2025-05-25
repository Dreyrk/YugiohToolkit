"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import countCards from "@/utils/countCards";
import { CollectionYugiCardProps } from "@/types";

export default function CollectionYugiCard({ card, selectedCards = [], onCardSelect }: CollectionYugiCardProps) {
  const isSelected = countCards(card, selectedCards);
  const hasDuplicate = selectedCards.some((c) => c.id === card.id && c.duplicate);
  const [selected, setSelected] = useState(isSelected);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setSelected(countCards(card, selectedCards));
  }, [selectedCards, card]);

  const selectCard = () => {
    if (!onCardSelect) {
      return;
    }

    onCardSelect(card);
  };

  const isInteractive = isMounted && onCardSelect;

  return (
    <div
      onClick={isInteractive ? selectCard : undefined}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      className={`relative transition-transform ${isInteractive ? "hover:scale-95 cursor-pointer" : "cursor-default"}`}
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
      {/* Selection counter */}
      {isMounted && selected > 0 && (
        <span className="absolute top-[40%] left-[37%] z-50 bg-neutral-950 text-slate-100 rounded-full h-8 w-8 grid place-content-center font-semibold">
          {selected}
        </span>
      )}

      {/* Duplicate indicator */}
      {isMounted && hasDuplicate && (
        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-bl z-50">
          Doublon
        </div>
      )}

      <Image
        className="z-40 rounded-lg"
        src={card.img || "/placeholder.svg?height=260&width=180"}
        alt={card.name}
        width={180}
        height={260}
      />
    </div>
  );
}
