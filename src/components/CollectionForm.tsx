"use client"; // Ce composant utilise useState, il doit être un Client Component

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Collection, CollectionYugiCard } from "@/types";
import countCards from "@/utils/countCards";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import CollectionCardGrid from "./CollectionCardGrid";
import SearchCardModal from "./cards/SearchCardModal";
import { Checkbox } from "./ui/checkbox";
import removeDuplicates from "@/utils/removeDuplicates";

export default function CollectionForm({
  collection,
  isEditMode,
  userId,
  handleEditCollection,
}: {
  collection: Omit<Collection, "_id">;
  isEditMode: boolean;
  userId: string;
  handleEditCollection: (formData: FormData) => Promise<void>;
}) {
  const [collectionCards, setCollectionCards] = useState<CollectionYugiCard[]>(collection.cards || []);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [removeDuplicateCards, setRemoveDuplicateCards] = useState<boolean>(false);
  const [isSharable, setIsSharable] = useState<boolean>(collection.isSharable || false);

  const handleRemoveDuplicate = () => {
    if (!removeDuplicateCards) {
      setCollectionCards(removeDuplicates(collection.cards, "id"));
      setRemoveDuplicateCards(true);
    } else {
      setCollectionCards(collection.cards || []);
      setRemoveDuplicateCards(false);
    }
  };

  useEffect(() => {
    setCollectionCards(collection.cards || []);
  }, [collection.cards]);

  const handleAddCard = (cardToAdd: CollectionYugiCard) => {
    const count = countCards(cardToAdd, collectionCards);
    if (count >= 2) {
      toast.warn(`Vous avez déjà un doublon de ${cardToAdd.name}.`);
      return;
    }
    // Si ça devient un doublon alors on notifie le duplicate
    if (count >= 1) {
      setCollectionCards((prev) => [...prev, { ...cardToAdd, duplicate: true }]);
    } else {
      setCollectionCards((prev) => [...prev, cardToAdd]);
    }
  };

  const handleRemoveCard = (cardToRemove: CollectionYugiCard) => {
    setCollectionCards((prev) => {
      const indexToRemove = prev.findLastIndex((card) => card.id === cardToRemove.id);
      if (indexToRemove === -1) return prev;
      const newCards = [...prev];
      newCards.splice(indexToRemove, 1);
      return newCards;
    });
    toast.error(`${cardToRemove.name} retirée de la collection.`);
  };

  const cancelActions = () => {
    setCollectionCards(collection.cards);
  };

  return (
    <>
      {isSearchModalOpen && (
        <SearchCardModal
          onAddCard={handleAddCard}
          onClose={() => setIsSearchModalOpen(false)}
          currentCards={collectionCards}
        />
      )}

      <form action={isEditMode ? handleEditCollection : undefined} className="space-y-4">
        {/* Champ caché pour passer les données des cartes à la Server Action */}
        {isEditMode && <input type="hidden" name="cardsData" value={JSON.stringify(collectionCards)} />}

        <div className="text-secondary space-y-2">
          {isEditMode ? (
            <Input
              name="name"
              defaultValue={collection.name}
              required
              maxLength={100}
              className="text-2xl font-bold bg-secondary text-primary"
            />
          ) : (
            <h2 className="text-2xl font-bold">{collection.name}</h2>
          )}

          {isEditMode ? (
            <Textarea
              className="bg-secondary text-primary"
              name="description"
              defaultValue={collection.description}
              rows={5}
              maxLength={500}
              placeholder="Ajouter une description..."
            />
          ) : (
            collection.description && <p>{collection.description}</p>
          )}
          <div className="flex justify-between py-3">
            <p className="text-sm italic">
              {collectionCards.length} carte{collectionCards.length !== 1 ? "s" : ""} dans la collection
            </p>
            <div className="flex flex-col items-end gap-4">
              <label
                htmlFor="isSharable"
                className="w-fit flex items-center gap-2 bg-glass px-4 py-2 rounded-xl cursor-pointer">
                <span>Visible (public)</span>
                <Checkbox
                  id="isSharable"
                  name="isSharable"
                  value={Number(isSharable)}
                  checked={isSharable}
                  onCheckedChange={(checked) => setIsSharable(Boolean(checked))}
                  disabled={!isEditMode}
                />
              </label>
              <label
                htmlFor="removeDuplicate"
                className="flex items-center gap-2 bg-glass px-4 py-2 rounded-xl cursor-pointer">
                <span>Retirer les doublons (pour une vision moins chargée)</span>
                <Checkbox
                  id="removeDuplicate"
                  value={Number(removeDuplicateCards)}
                  onCheckedChange={handleRemoveDuplicate}
                  checked={removeDuplicateCards}
                />
              </label>
            </div>
          </div>
        </div>

        {isEditMode && (
          <div className="flex justify-between items-center">
            <Button type="button" variant="outline" onClick={() => setIsSearchModalOpen(true)}>
              + Ajouter des cartes
            </Button>
            <div className="flex gap-2">
              <Link href={`/profile/${userId}/collections/${collection.id}`}>
                <Button onClick={cancelActions} type="button" variant="destructive">
                  Annuler
                </Button>
              </Link>
              <Button variant="success" type="submit">
                Sauvegarder
              </Button>
            </div>
          </div>
        )}
      </form>

      {collectionCards.length === 0 ? (
        <div className="text-center text-secondary py-12">
          <p>Cette collection est vide.</p>
          {isEditMode && (
            <Button className="mt-4" onClick={() => setIsSearchModalOpen(true)}>
              Parcourir les cartes pour commencer
            </Button>
          )}
        </div>
      ) : (
        <CollectionCardGrid
          cards={collectionCards}
          selectedCards={collectionCards}
          isEditMode={isEditMode}
          onRemoveCard={handleRemoveCard}
          showSelectionCounter={isEditMode}
        />
      )}
    </>
  );
}
