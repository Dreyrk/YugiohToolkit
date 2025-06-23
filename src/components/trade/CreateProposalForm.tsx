"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useActionState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { YugiCards } from "@/types";
import { useDebouncedCallback } from "@/hooks/useDebounceCallback";
import { createTradeProposal } from "@/actions/trade/createProposal";
import YugiCard from "../cards/YugiCard";
import Loader from "../Loader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import FormMessage from "../ui/form-message";

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" disabled={pending} className="w-full flex gap-4 justify-center items-center">
      {pending ? <Loader size={20} absolute={false} /> : null}
      {pending ? "Création en cours..." : "Créer la proposition"}
    </Button>
  );
}

export function CreateProposalForm({ userId }: { userId: string }) {
  const router = useRouter();
  const [formState, formAction, isPending] = useActionState(createTradeProposal, { message: "" });

  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<YugiCards | null>(null);
  const [searchResults, setSearchResults] = useState<YugiCards[]>([]);

  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useDebouncedCallback(async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const url = `/api/cards?search=${encodeURIComponent(query)}&limit=10`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Erreur réseau lors de la recherche");
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Impossible de rechercher les cartes:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, 300);

  useEffect(() => {
    if (formState.success) {
      router.push(`/profile/${userId}/social/trade`);
    }
  }, [formState, router, userId]);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Nouvelle Proposition d&apos;Échange</CardTitle>
        <CardDescription>
          Choisissez une carte que vous souhaitez proposer à l&apos;échange, puis spécifiez son état.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label>Carte à proposer</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                  {selectedCard ? selectedCard.name : "Sélectionnez une carte..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                  <CommandInput placeholder="Rechercher une carte..." onValueChange={handleSearch} />
                  <CommandList>
                    {isSearching && (
                      <div className="py-6 flex items-center justify-center">
                        <Loader absolute={false} />
                      </div>
                    )}
                    {!isSearching && searchResults.length === 0 && <CommandEmpty>Aucune carte trouvée.</CommandEmpty>}
                    <CommandGroup>
                      {!isSearching &&
                        searchResults.map((card) => (
                          <CommandItem
                            key={card.id}
                            value={card.name}
                            onSelect={() => {
                              setSelectedCard(card);
                              setOpen(false);
                            }}>
                            <Check
                              className={cn("mr-2 h-4 w-4", selectedCard?.id === card.id ? "opacity-100" : "opacity-0")}
                            />
                            {card.name}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <input type="hidden" name="masterCardId" value={selectedCard?.id || ""} />
          </div>
          {selectedCard && (
            <>
              <div className="flex justify-center">
                <YugiCard card={selectedCard} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="condition">État</Label>
                  <Select name="condition" required>
                    <SelectTrigger>
                      <SelectValue placeholder="État de la carte" />
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
                      <SelectValue placeholder="Langue de la carte" />
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
                <Textarea name="notes" placeholder="Ex: 1ère édition, quelques micro-rayures au dos..." />
              </div>
              <SubmitButton pending={isPending} />
            </>
          )}

          {formState?.message && <FormMessage success={formState.success} message={formState.message} />}
        </form>
      </CardContent>
    </Card>
  );
}
