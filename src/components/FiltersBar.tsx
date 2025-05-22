"use client";

import { FiltersBarProps } from "@/types";
import { MainDeckTypes } from "@/constants";
import { useState } from "react";
import Loader from "./Loader";

export default function FiltersBar({ cards, setCards }: FiltersBarProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const mainDeckSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    const newType = e.target.value;
    if (!newType) return; // Ignorer si aucune valeur n'est sélectionnée

    // Mettre à jour les types sélectionnés
    setSelectedTypes((prev) => {
      const updatedTypes = prev.includes(newType) ? prev : [...prev, newType];
      // Filtrer les cartes avec les types mis à jour
      if (setCards && updatedTypes.length > 0) {
        setCards(cards.filter((card) => updatedTypes.includes(card.type)));
      } else if (setCards) {
        setCards(cards); // Restaurer toutes les cartes si aucun type sélectionné
      }
      return updatedTypes;
    });
    setLoading(false);
  };

  return (
    <div className="w-full p-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-between items-center">
          <span className="max-w-xs space-x-1">
            <span className="font-semibold">Types:</span>
            <span>{selectedTypes.length > 0 ? selectedTypes.join(", ") : "Aucun"}</span>
          </span>
          <select onChange={mainDeckSelect} id="deck-select">
            <option value="">Select a type</option>
            {MainDeckTypes.map((type, i) => (
              <option key={i} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
