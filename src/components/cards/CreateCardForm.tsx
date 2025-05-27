"use client";

import { useActionState, useState } from "react";
import { toast } from "react-toastify";
import { createCard } from "@/actions/createCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ATTRIBUTES, CARD_TYPES, DECK_TYPES, MONSTER_RACES } from "@/constants";

export default function CreateCardForm() {
  const [selectedCardType, setSelectedCardType] = useState("");
  const [state, formAction, isPending] = useActionState(createCard, null);

  const isMonsterCard = Boolean(
    selectedCardType && !selectedCardType.includes("Spell") && !selectedCardType.includes("Trap")
  );

  if (state?.success) {
    toast.success("Yu-Gi-Oh card created successfully.");
  } else if (state?.error) {
    toast.error(state.error);
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Create New Yu-Gi-Oh Card</CardTitle>
          <CardDescription className="text-center">
            Fill in the details below to create a new Yu-Gi-Oh card
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <BasicFields isMonsterCard={isMonsterCard} setSelectedCardType={setSelectedCardType} />

              {/* Monster Stats */}
              {isMonsterCard && <MonsterFields />}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="desc">Card Description *</Label>
              <Textarea
                id="desc"
                name="desc"
                placeholder="Enter the card's effect or flavor text..."
                className="min-h-[120px]"
                required
              />
            </div>

            <input type="hidden" name="createdBy" value="{}" />

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button type="submit" size="lg" disabled={isPending} className="w-full md:w-auto px-8">
                {isPending ? "Creating Card..." : "Create Card"}
              </Button>
            </div>

            {/* Display success/error messages */}
            {state?.success && <div className="text-center text-green-600 font-medium">Card created successfully!</div>}
            {state?.error && <div className="text-center text-red-600 font-medium">{state.error}</div>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function BasicFields({
  isMonsterCard,
  setSelectedCardType,
}: {
  isMonsterCard: boolean;
  setSelectedCardType: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className={`space-y-4 ${!isMonsterCard ? "col-span-2" : ""}`}>
      <h3 className="text-lg font-semibold">Basic Information</h3>

      <div className="space-y-2">
        <Label htmlFor="id">Card ID *</Label>
        <Input id="id" name="id" type="number" placeholder="e.g., 12345678" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Card Name *</Label>
        <Input id="name" name="name" placeholder="e.g., Blue-Eyes White Dragon" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Card Type *</Label>
        <Select name="type" required onValueChange={(type) => setSelectedCardType(type)}>
          <SelectTrigger>
            <SelectValue placeholder="Select card type" />
          </SelectTrigger>
          <SelectContent>
            {CARD_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input id="price" name="price" type="number" step="0.01" placeholder="e.g., 10.99" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="img">Image URL *</Label>
        <Input id="img" name="img" type="url" placeholder="https://example.com/card-image.jpg" required />
      </div>
    </div>
  );
}

function MonsterFields() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Monster Stats</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="atk">ATK *</Label>
          <Input id="atk" name="atk" type="number" placeholder="e.g., 3000" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="def">DEF *</Label>
          <Input id="def" name="def" type="number" placeholder="e.g., 2500" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="level">Level *</Label>
        <Input id="level" name="level" type="number" min="1" max="12" placeholder="e.g., 8" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="attribute">Attribute *</Label>
        <Select name="attribute" required>
          <SelectTrigger>
            <SelectValue placeholder="Select attribute" />
          </SelectTrigger>
          <SelectContent>
            {ATTRIBUTES.map((attr) => (
              <SelectItem key={attr} value={attr}>
                {attr}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="race">Race/Type *</Label>
        <Select name="race" required>
          <SelectTrigger>
            <SelectValue placeholder="Select race" />
          </SelectTrigger>
          <SelectContent>
            {MONSTER_RACES.map((race) => (
              <SelectItem key={race} value={race}>
                {race}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="deckType">Deck Type *</Label>
        <Select name="deckType" required>
          <SelectTrigger>
            <SelectValue placeholder="Select deck type" />
          </SelectTrigger>
          <SelectContent>
            {DECK_TYPES.map((deck) => (
              <SelectItem key={deck.value} value={deck.value}>
                {deck.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
