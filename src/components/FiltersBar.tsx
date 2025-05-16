"use client";

import { FiltersBarProps } from "@/types";
import { MainDeckTypes, ExtraDeckTypes } from "@/constants";
import { useState } from "react";
import Loader from "./Loader";

export default function FiltersBar({ cards, setCards }: FiltersBarProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const mainDeckSelect = (e: any) => {
    setLoading(true);
    if (selectedTypes.length) {
      setSelectedTypes([...new Set([...selectedTypes, e.target.value])]);
    } else {
      setSelectedTypes([e.target.value]);
    }
    setCards(cards.filter((card) => selectedTypes.includes(card.type)));

    setLoading(false);
    return;
  };

  return (
    <div className="w-full p-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-between items-center">
          <span className="max-w-xs space-x-1">
            <span className="font-semibold">Selected Types:</span>
            <span>{selectedTypes.join(", ")}</span>
          </span>
          <select onChange={mainDeckSelect} id="deck-select">
            <option value="">-----SELECT CARD TYPES-----</option>
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
