/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import type React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ExtraDeckTypes, MainDeckTypes } from "@/constants";

export default function CollectionFilters({ duplicate = false }: { duplicate?: boolean }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    searchParams.get("types")?.split(",").filter(Boolean) || []
  );
  const [onlyDuplicate, setOnlyDuplicate] = useState(searchParams.get("onlyDuplicate") === "true");
  const [isOpen, setIsOpen] = useState(true);

  const isEditMode = searchParams.get("edit") === "true";
  const cardTypes = MainDeckTypes.concat(ExtraDeckTypes);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters();
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    setSelectedTypes((prev) => {
      if (checked) {
        return [...prev, type];
      } else {
        return prev.filter((t) => t !== type);
      }
    });
  };

  const handleOnlyDuplicate = (checked: boolean) => {
    setOnlyDuplicate(checked);
    updateFilters();
  };

  const updateFilters = () => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (onlyDuplicate) params.set("onlyDuplicate", onlyDuplicate ? "true" : "false");
    if (selectedTypes.length > 0) params.set("types", selectedTypes.join(","));

    replace(`${pathname}?${params.toString()}${isEditMode ? "&edit=true" : ""}`);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      updateFilters();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [selectedTypes, onlyDuplicate]);

  return (
    <div className="bg-card border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filtres</h2>
        <Button type="button" variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </div>

      {isOpen && (
        <>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search cards by name..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button type="submit">
              <Search />
            </Button>
          </form>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label>Card Types</Label>
              <div className="grid grid-cols-2 gap-2">
                {cardTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type}`}
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
                    />
                    <Label htmlFor={`type-${type}`} className="text-sm cursor-pointer">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {duplicate && (
            <>
              <hr className="border-2 border-primary" />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`duplicate`}
                  checked={onlyDuplicate}
                  onCheckedChange={(checked) => handleOnlyDuplicate(checked as boolean)}
                />
                <Label htmlFor={`duplicate`} className="text-sm cursor-pointer">
                  Doublons seulement
                </Label>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
