"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { FiltersBarProps } from "@/types";
import { MainDeckTypes } from "@/constants";
import Loader from "./Loader";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function FiltersBar({ cards, setCards }: FiltersBarProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddType = (newType: string) => {
    if (!newType) return; // Ignore if no value is selected

    setLoading(true);

    // Update selected types
    setSelectedTypes((prev) => {
      // Only add the type if it's not already selected
      if (prev.includes(newType)) return prev;

      const updatedTypes = [...prev, newType];

      return updatedTypes;
    });

    if (selectedTypes.length > 0) {
      setCards(cards.filter((card) => selectedTypes.includes(card.type)));
    } else if (setCards) {
      setCards(cards);
    }

    setLoading(false);
  };

  const handleRemoveType = (typeToRemove: string) => {
    setLoading(true);

    setSelectedTypes((prev) => {
      const updatedTypes = prev.filter((type) => type !== typeToRemove);

      return updatedTypes;
    });

    // Filter cards with updated types
    if (selectedTypes.length > 0) {
      setCards(cards.filter((card) => selectedTypes.includes(card.type)));
    } else if (setCards) {
      // If no types selected, show all cards
      setCards(cards);
    }
    setLoading(false);
  };

  // Get available types that haven't been selected yet
  const getAvailableTypes = () => {
    return MainDeckTypes.filter((type) => !selectedTypes.includes(type));
  };

  return (
    <div className="w-full p-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-grow">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-semibold mr-1">Types:</span>
              {selectedTypes.length === 0 ? (
                <span className="text-sm text-muted-foreground">Aucun</span>
              ) : (
                selectedTypes.map((type) => (
                  <Badge key={type} variant="secondary" className="flex items-center gap-1">
                    {type}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => handleRemoveType(type)}>
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {type}</span>
                    </Button>
                  </Badge>
                ))
              )}
            </div>
          </div>

          <div className="w-full sm:w-auto">
            <Select onValueChange={handleAddType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Select a type</SelectItem>
                {getAvailableTypes().map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}
