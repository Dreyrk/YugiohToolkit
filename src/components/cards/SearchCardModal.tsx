"use client";

import { useState, useEffect } from "react";
import useDebounce from "@/hooks/useDebouce";
import { CollectionYugiCard } from "@/types";
import CollectionCardGrid from "../CollectionCardGrid";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface SearchCardModalProps {
  onAddCard: (card: CollectionYugiCard) => void;
  onClose: () => void;
  currentCards: CollectionYugiCard[];
}

export default function SearchCardModal({ onAddCard, onClose, currentCards }: SearchCardModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<CollectionYugiCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const limit = 40;

  useEffect(() => {
    setResults([]);
    setPage(1);
    setHasMore(true);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.length > 0 && debouncedSearchTerm.length < 3) return;
    if (!hasMore) return;

    fetchCards(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedSearchTerm]);

  const fetchCards = async (isNewSearch = false) => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.set("search", debouncedSearchTerm);
      queryParams.set("page", page.toString());
      queryParams.set("limit", limit.toString());

      const response = await fetch(`/api/cards?${queryParams.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch cards");

      const data = await response.json();

      setResults((prev) => (isNewSearch || page === 1 ? data : [...prev, ...data]));
      setHasMore(data.length === limit);
    } catch (error) {
      console.error("Error fetching cards in modal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const handleCardClick = (card: CollectionYugiCard) => {
    onAddCard(card);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-[100] flex items-center justify-center p-4"
      onClick={onClose}>
      <div
        className="bg-background border w-full max-w-5xl h-[90vh] rounded-lg p-4 md:p-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <h2 className="text-2xl font-bold">Ajouter une carte à la collection</h2>
          <button onClick={onClose} className="text-2xl font-bold">
            &times;
          </button>
        </div>
        <Input
          type="search"
          placeholder="Rechercher par nom..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          className="mb-4 flex-shrink-0"
          autoFocus
        />
        <div className="flex-grow overflow-y-auto pr-2">
          <CollectionCardGrid
            cards={results}
            onCardSelect={handleCardClick}
            selectedCards={currentCards}
            isLoading={isLoading && page === 1}
          />
          {hasMore && (
            <div className="flex justify-center mt-4">
              <Button onClick={handleLoadMore} disabled={isLoading} variant="outline">
                {isLoading ? "Chargement..." : "Charger plus"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
