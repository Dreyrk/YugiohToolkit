"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import type { Collection, CollectionYugiCard } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import getUserCollections from "@/actions/users/collection/getUserCollections";
import createNewUserCollection from "@/actions/users/collection/createNewUserCollection";
import { addCardsToCollection } from "@/actions/users/collection/addCardToCollection";

interface CollectionManagerProps {
  selectedCards: CollectionYugiCard[];
  onComplete: () => void;
}

export default function CollectionManager({ selectedCards, onComplete }: CollectionManagerProps) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDescription, setNewCollectionDescription] = useState("");
  const [open, setOpen] = useState(false);

  // Fetch user collections when dialog opens
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (open) {
      fetchUserCollections();
    }
  };

  const fetchUserCollections = async () => {
    setIsLoading(true);
    try {
      const allCollections = await getUserCollections();

      if (!allCollections || !allCollections.length) {
        toast.warn("Aucune collection disponible");
        setCollections([]);
        setSelectedCollection("");
        return;
      }

      setCollections(allCollections);
      setSelectedCollection(allCollections[0].id);
    } catch (error) {
      console.error("Error fetching collections:", error);
      toast.error("Échec du chargement des collections");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCollection = async () => {
    setIsLoading(true);
    try {
      if (isCreatingNew) {
        if (!newCollectionName.trim()) {
          toast.error("Nom de collection requis");
          setIsLoading(false);
          return;
        }

        const newCollection: Omit<Collection, "id"> = {
          name: newCollectionName.trim(),
          description: newCollectionDescription.trim(),
          cards: selectedCards,
        };

        await createNewUserCollection(newCollection);

        toast.success(
          `Nouvelle collection "${newCollectionName}" avec ${selectedCards.length} carte${
            selectedCards.length > 1 ? "s" : ""
          } ajoutée avec succès !`
        );
      } else {
        if (!selectedCollection) {
          toast.error("Veuillez sélectionner une collection valide");
          setIsLoading(false);
          return;
        }

        await addCardsToCollection(selectedCollection, selectedCards);

        toast.success(
          `Ajout de ${selectedCards.length} carte${
            selectedCards.length > 1 ? "s" : ""
          } à collection id: ${selectedCollection}`
        );
      }

      setOpen(false);
      setIsCreatingNew(false);
      setNewCollectionName("");
      setNewCollectionDescription("");
      onComplete();
    } catch (error) {
      console.error("Error adding to collection:", error);
      toast.error("Échec de l'ajout des cartes à la collection");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm">Nouvelle collection</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouvelle collection</DialogTitle>
          <DialogDescription>
            Ajouter {selectedCards.length} carte{selectedCards.length !== 1 ? "s" : ""} à la collection.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {!isCreatingNew ? (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="collection" className="text-right">
                  Collection
                </Label>
                <div className="col-span-3">
                  <Select
                    value={selectedCollection}
                    onValueChange={setSelectedCollection}
                    disabled={isLoading || collections.length === 0}>
                    <SelectTrigger id="collection">
                      <SelectValue placeholder="Sélectionnez une collection" />
                    </SelectTrigger>
                    <SelectContent>
                      {collections.map((collection) => (
                        <SelectItem key={collection.id} value={collection.id}>
                          {collection.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={() => setIsCreatingNew(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Créer une nouvelle collection
              </Button>
            </>
          ) : (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom
                </Label>
                <Input
                  id="name"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  className="col-span-3"
                  placeholder="Nom de la collection"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newCollectionDescription}
                  onChange={(e) => setNewCollectionDescription(e.target.value)}
                  className="col-span-3"
                  placeholder="Description optionnelle"
                />
              </div>

              <Button variant="outline" className="w-full" onClick={() => setIsCreatingNew(false)}>
                Sélectionner une collection existante
              </Button>
            </>
          )}
        </div>

        <DialogFooter>
          <Button onClick={handleAddToCollection} disabled={isLoading}>
            {isLoading ? "Traitement..." : "Ajouter à la collection"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
