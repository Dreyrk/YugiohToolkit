"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Types } from "mongoose";
import { toast } from "react-toastify";
import { Pencil, Trash2, Plus, ChevronRight } from "lucide-react";
import type { Collection } from "@/types";
import getUserCollections from "@/actions/users/collection/getUserCollections";
import { editCollection } from "@/actions/users/collection/editUserCollection";
import { deleteUserCollection } from "@/actions/users/collection/deleteUserCollection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import YugiCard from "./cards/CollectionYugiCard";

export default function UserCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDescription, setNewCollectionDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    setIsLoading(true);
    try {
      const allCollections = await getUserCollections();
      setCollections(allCollections);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching collections:", error);
      toast.error("Failed to load your collections");
      setIsLoading(false);
    }
  };

  const handleCreateCollection = async () => {
    if (!newCollectionName.trim()) {
      toast.error("Collection name is required");
      return;
    }

    try {
      const newCollection = {
        id: new Types.ObjectId().toString(),
        name: newCollectionName,
        description: newCollectionDescription,
        cards: [],
      };

      setCollections((prev) => [...prev, newCollection]);

      setNewCollectionName("");
      setNewCollectionDescription("");
      setIsCreating(false);

      toast.success(`Nouvelle collection "${newCollectionName}"`);
    } catch (error) {
      console.error("Error creating collection:", error);
      toast.error("Failed to create collection");
    }
  };

  const handleUpdateCollection = async () => {
    if (!selectedCollection) return;

    if (!newCollectionName.trim()) {
      toast.error("Nom de la collection requis");
      return;
    }

    try {
      const updatedCollection = {
        ...selectedCollection,
        name: newCollectionName,
        description: newCollectionDescription,
      };
      const { success, error } = await editCollection(updatedCollection);

      if (success && !error) {
        setCollections((prev) => prev.map((c) => (c.id === selectedCollection.id ? updatedCollection : c)));
        setSelectedCollection(null);
        setNewCollectionName("");
        setNewCollectionDescription("");
        setIsEditing(false);

        toast.success(`Updated collection "${newCollectionName}"`);
      } else {
        toast.error("Un problème est survenue...");
      }
    } catch (error) {
      console.error("Error updating collection:", error);
      toast.error("Failed to update collection");
    }
  };

  const handleDeleteCollection = async (collectionId: string) => {
    try {
      const collectionToDelete = collections.find((c) => c.id === collectionId);

      const { success, error } = await deleteUserCollection(collectionId);

      if (success && !error) {
        setCollections((prev) => prev.filter((c) => c.id !== collectionId));

        toast.success(`Deleted collection "${collectionToDelete?.name}"`);
      } else {
        toast.error("Un problème est survenue...");
      }
    } catch (error) {
      console.error("Error deleting collection:", error);
      toast.error("Failed to delete collection");
    }
  };

  const handleEditClick = (collection: Collection) => {
    setSelectedCollection(collection);
    setNewCollectionName(collection.name);
    setNewCollectionDescription(collection.description || "");
    setIsEditing(true);
  };

  const handleViewCollection = (collection: Collection) => {
    setSelectedCollection(collection);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="w-full">
            <CardHeader className="pb-2">
              <div className="h-6 w-1/3 bg-muted rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="w-20 h-28 bg-muted rounded animate-pulse flex-shrink-0" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (selectedCollection) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" className="flex items-center gap-1" onClick={() => setSelectedCollection(null)}>
            <ChevronRight className="h-4 w-4 rotate-180" />
            Back to Collections
          </Button>

          <Button variant="outline" size="sm" onClick={() => handleEditClick(selectedCollection)}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit Collection
          </Button>
        </div>

        <div>
          <h2 className="text-2xl font-bold">{selectedCollection.name}</h2>
          {selectedCollection.description && (
            <p className="text-muted-foreground mt-1">{selectedCollection.description}</p>
          )}
          <p className="text-sm text-muted-foreground mt-2">
            {selectedCollection.cards.length} card{selectedCollection.cards.length !== 1 ? "s" : ""} in collection
          </p>
        </div>

        {selectedCollection.cards.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <p className="text-muted-foreground">No cards in this collection yet.</p>
            <Button className="mt-4">Browse Cards to Add</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {selectedCollection.cards.map((card, index) => (
              <div key={`${card.id}-${index}`} className="relative">
                <YugiCard card={card} />
                {card.duplicate && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-bl z-50">
                    Duplicate
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-secondary">Collections</h2>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Créer collection
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvelle Collection</DialogTitle>
              <DialogDescription>Organises tes cartes via les collections</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="Collection name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description (Optionnel)</Label>
                <Textarea
                  id="description"
                  value={newCollectionDescription}
                  onChange={(e) => setNewCollectionDescription(e.target.value)}
                  placeholder="Describe your collection"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateCollection}>Créer Collection</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {collections.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground">Pas encore de collection.</p>
          <Button className="mt-4" onClick={() => setIsCreating(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Collection
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {collections.map((collection) => (
            <Card key={collection.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{collection.name}</CardTitle>
                    <CardDescription>
                      {collection.cards.length} carte{collection.cards.length !== 1 ? "s" : ""}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEditClick(collection)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Modifier</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteCollection(collection.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Supprimer</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {collection.description && (
                  <p className="text-sm text-muted-foreground mb-2">{collection.description}</p>
                )}
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {collection.cards.slice(0, 5).map((card) => (
                    <div key={card.id} className="w-20 h-28 flex-shrink-0 relative rounded overflow-hidden">
                      <Image
                        src={card.img || "/placeholder.svg?height=112&width=80"}
                        alt={card.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  {collection.cards.length > 5 && (
                    <div className="w-20 h-28 flex-shrink-0 bg-muted flex items-center justify-center rounded">
                      <span className="text-sm font-medium">+{collection.cards.length - 5}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full" onClick={() => handleViewCollection(collection)}>
                  Voir Collection
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier Collection</DialogTitle>
            <DialogDescription>Mets à jour la collection.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nom</Label>
              <Input
                id="edit-name"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Collection name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description (Optionnel)</Label>
              <Textarea
                id="edit-description"
                value={newCollectionDescription}
                onChange={(e) => setNewCollectionDescription(e.target.value)}
                placeholder="Describe your collection"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Annuler
            </Button>
            <Button onClick={handleUpdateCollection}>Sauvegarder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
