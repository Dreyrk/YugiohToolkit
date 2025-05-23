"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { FiltersBarProps } from "@/types";
import { MainDeckTypes } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FiltersBar({ filters, onChange }: FiltersBarProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleTypeChange = (type: string) => {
    if (selectedTypes.includes(type)) {
      // remove
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
      onChange({ types: selectedTypes.filter((t) => t !== type) });
    } else {
      // add
      setSelectedTypes((prev) => [...prev, type]);
      onChange({ types: [...selectedTypes, type] });
    }
  };

  const getAvailableTypes = () => {
    return MainDeckTypes.filter((type) => !selectedTypes.includes(type));
  };

  return (
    <div className="w-full p-4">
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
                    onClick={() => handleTypeChange(type)}>
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {type}</span>
                  </Button>
                </Badge>
              ))
            )}
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <Select value={filters.types.join(",")} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sélectionne un type" />
            </SelectTrigger>
            <SelectContent>
              {getAvailableTypes().map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
