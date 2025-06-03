/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CollectionYugiCard } from "@/types";
import UserCollections from "@/components/UserCollections"; // Import UserCollections component
import countCards from "@/utils/countCards";
import CollectionFilters from "./CollectionFilters";
import CollectionManager from "./CollectionManager";
import CollectionCardGrid from "./CollectionCardGrid";

export default function CardCollection({ userId }: { userId?: string }) {
  const searchParams = useSearchParams();
  const [cards, setCards] = useState<CollectionYugiCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<CollectionYugiCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const search = searchParams.get("search") || "";
  const types = searchParams.get("types") || "";
  const limit = 60;

  useEffect(() => {
    fetchCards();
  }, [search, types, page]);

  const fetchCards = async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) queryParams.set("search", search);
      if (types) queryParams.set("types", types);

      const response = await fetch(`/api/cards?${queryParams.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch cards");

      const data = await response.json();

      if (page === 1) {
        setCards(data);
      } else {
        setCards((prev) => [...prev, ...data]);
      }

      setHasMore(data.length === limit);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardSelect = (card: CollectionYugiCard) => {
    setSelectedCards((prev) => {
      const currentCount = countCards(card, prev);

      if (currentCount === 0) {
        // First click: Add the card normally
        return [...prev, card];
      } else if (currentCount === 1) {
        // Second click: Add as duplicate
        const duplicateCard = { ...card, duplicate: true };
        return [...prev, duplicateCard];
      } else {
        // Third click: Remove all instances of the card
        return prev.filter((c) => c.id !== card.id);
      }
    });
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const clearSelection = () => {
    setSelectedCards([]);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Parcourir les cartes</TabsTrigger>
          <TabsTrigger value="collections">Mes Collections</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <CollectionFilters />

          {selectedCards.length > 0 && (
            <div className="bg-muted p-4 rounded-lg flex items-center justify-between">
              <div className="text-sm font-medium">
                <p>
                  {selectedCards.length} carte{selectedCards.length !== 1 ? "s" : ""} sélectionnée
                  {selectedCards.length !== 1 ? "s" : ""}
                </p>
                {selectedCards.some((c) => c.duplicate) && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedCards.filter((c) => c.duplicate).length} doublon
                    {selectedCards.filter((c) => c.duplicate).length !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="destructive" size="sm" onClick={clearSelection}>
                  Clear
                </Button>
                <CollectionManager selectedCards={selectedCards} onComplete={clearSelection} />
              </div>
            </div>
          )}

          <CollectionCardGrid
            cards={cards}
            selectedCards={selectedCards}
            onCardSelect={handleCardSelect}
            isLoading={isLoading}
            showSelectionCounter={true}
          />

          {hasMore && (
            <div className="flex justify-center mt-6">
              <Button onClick={handleLoadMore} disabled={isLoading} variant="outline">
                {isLoading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="collections">
          <UserCollections isCurrentUser={true} userId={userId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
