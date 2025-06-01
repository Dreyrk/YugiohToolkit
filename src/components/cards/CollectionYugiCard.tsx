"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import countCards from "@/utils/countCards";
import { CollectionYugiCardProps } from "@/types";
import { FaMinusCircle } from "react-icons/fa";

export default function CollectionYugiCard({
  card,
  selectedCards = [],
  onCardSelect,
  onRemoveCard,
  isEditMode,
  showSelectionCounter,
}: CollectionYugiCardProps) {
  const isSelected = countCards(card, selectedCards);
  const hasDuplicate = selectedCards.some((c) => c.id === card.id && c.duplicate) || card.duplicate;
  const [selected, setSelected] = useState(isSelected);

  useEffect(() => {
    setSelected(countCards(card, selectedCards));
  }, [selectedCards, card]);

  const selectCard = () => {
    if (onCardSelect) {
      onCardSelect(card);
    }
  };

  const removeCard = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêche le déclenchement de 'selectCard' si le bouton est sur la carte
    if (onRemoveCard) {
      onRemoveCard(card);
    }
  };

  const isInteractive = Boolean(onCardSelect);

  return (
    <div
      onClick={isInteractive ? selectCard : undefined}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      className={`relative w-fit transition-transform ${
        isInteractive ? "hover:scale-95 cursor-pointer" : "cursor-default"
      }`}
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
      {isEditMode && onRemoveCard && (
        <button
          onClick={removeCard}
          className="absolute top-1 right-1 z-50"
          type="button"
          aria-label="Retirer la carte">
          <FaMinusCircle size={24} className="text-red-600 bg-white rounded-full" />
        </button>
      )}

      {/* Selection counter */}
      {selected > 0 && showSelectionCounter && (
        <span className="absolute top-[40%] left-[37%] z-50 bg-neutral-950 text-slate-100 rounded-full h-8 w-8 grid place-content-center font-semibold">
          {selected}
        </span>
      )}

      {/* Duplicate indicator */}
      {hasDuplicate && (
        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-bl z-50">
          Doublon
        </div>
      )}

      <Image
        className="z-40 rounded-lg"
        src={card.img || "/assets/cardBack.jpg"}
        alt={card.name}
        width={180}
        height={260}
      />
    </div>
  );
}
