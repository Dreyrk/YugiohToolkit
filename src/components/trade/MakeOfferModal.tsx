"use client";

import { useState, useEffect, useActionState } from "react";
import useDebounce from "@/hooks/useDebouce";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { CollectionYugiCard, MakeOfferModalProps, YugiCards } from "@/types";
import { createTradeOffer } from "@/actions/trade/createOffer";
import YugiCard from "../cards/YugiCard";
import Loader from "../Loader";
import FormMessage from "../ui/form-message";
import OfferCardSelector from "./OfferCardSelector";

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" disabled={pending} className="w-full mt-4">
      {pending ? <Loader absolute={false} /> : null}
      {pending ? "Envoi de l'offre..." : "Envoyer l'offre"}
    </Button>
  );
}

export function MakeOfferModal({ proposalId, proposerPseudo, children }: MakeOfferModalProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<CollectionYugiCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const limit = 20;

  const [selectedCard, setSelectedCard] = useState<CollectionYugiCard | null>(null);
  const [formState, formAction, isPending] = useActionState(createTradeOffer, { message: "" });

  useEffect(() => {
    setResults([]);
    setPage(1);
    setHasMore(true);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.length > 0 && debouncedSearchTerm.length < 2) return;
    if (!hasMore && debouncedSearchTerm) return;
    fetchCards(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (page > 1) fetchCards(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchCards = async (isNewSearch = false) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        search: debouncedSearchTerm,
        page: isNewSearch ? "1" : page.toString(),
        limit: limit.toString(),
      });
      const response = await fetch(`/api/cards?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch cards");
      const data = await response.json();
      setResults((prev) => (isNewSearch ? data : [...prev, ...data]));
      setHasMore(data.length === limit);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (formState.success) {
      setDialogOpen(false);
    }
  }, [formState]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSearchTerm("");
      setResults([]);
      setSelectedCard(null);
    }
    setDialogOpen(open);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-7xl h-fit flex flex-col">
        <DialogHeader>
          <DialogTitle>Faire une offre à @{proposerPseudo}</DialogTitle>
          <DialogDescription>
            {selectedCard
              ? "Complétez les détails de la carte que vous offrez."
              : "Recherchez et sélectionnez une carte de votre collection à proposer en échange."}
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="flex-grow flex flex-col overflow-hidden">
          <input type="hidden" name="masterCardId" value={selectedCard?.id || ""} />
          <input type="hidden" name="proposalId" value={proposalId} />
          {!selectedCard ? (
            <>
              <Input
                type="search"
                placeholder="Rechercher une carte à offrir..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 flex-shrink-0"
                autoFocus
              />
              <div className="flex-grow overflow-y-auto pr-2">
                <OfferCardSelector
                  cards={results}
                  onCardSelect={(card) => setSelectedCard(card)}
                  isLoading={isLoading && page === 1}
                />
                {hasMore && (
                  <div className="flex justify-center mt-4">
                    <Button onClick={handleLoadMore} disabled={isLoading} variant="outline" type="button">
                      {isLoading ? "Chargement..." : "Charger plus"}
                    </Button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-4 overflow-y-auto pr-2">
              <div className="flex items-start gap-4">
                <YugiCard card={selectedCard as unknown as YugiCards} />
                <div className="flex-grow">
                  <h3 className="font-bold text-lg">{selectedCard.name}</h3>
                  <Button variant="link" onClick={() => setSelectedCard(null)} className="p-0 h-auto text-sm">
                    Changer de carte
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="condition">État</Label>
                  <Select name="condition" required>
                    <SelectTrigger>
                      <SelectValue placeholder="État" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Neuf">Neuf</SelectItem>
                      <SelectItem value="Quasi neuf">Quasi neuf</SelectItem>
                      <SelectItem value="Peu joué">Peu joué</SelectItem>
                      <SelectItem value="Joué">Joué</SelectItem>
                      <SelectItem value="Abîmé">Abîmé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Langue</Label>
                  <Select name="language" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FR">Français (FR)</SelectItem>
                      <SelectItem value="EN">Anglais (EN)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optionnel)</Label>
                <Textarea name="notes" placeholder="Ex: 1ère édition..." />
              </div>
              <SubmitButton pending={isPending} />
              <FormMessage success={formState.success} message={formState.message} />
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
