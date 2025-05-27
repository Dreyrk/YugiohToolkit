"use server";

import { redirect } from "next/navigation";
import db from "@/lib/database/db";
import Cards from "@/lib/database/models/cards.model";
import { SessionUser, YugiCards } from "@/types";
import { getSession } from "./auth/getSession";

interface CardDataType extends YugiCards {
  createdBy: SessionUser | string;
}

export async function createCard(prevState: { success: boolean; error?: string } | null, formData: FormData) {
  try {
    await db();

    const session = await getSession();

    // Extract form data
    const cardData: Omit<CardDataType, "id"> = {
      name: (formData.get("name") as string).trim(),
      type: (formData.get("type") as string).trim(),
      desc: (formData.get("desc") as string).trim(),
      img: (formData.get("img") as string).trim(),
      price: Number((formData.get("price") as string).trim()),
      atk: Number(formData.get("atk")),
      def: Number(formData.get("def")),
      level: Number(formData.get("level")),
      attribute: (formData.get("attribute") as string).trim(),
      race: (formData.get("race") as string).trim(),
      deckType: (formData.get("deckType") as string).trim(),
      createdBy: session.user || "Unknown user",
    };

    // Validate required fields
    if (!cardData.name || !cardData.type || !cardData.desc || !cardData.img) {
      return { success: false, error: "Please fill in all required fields" };
    }

    // Add optional fields only if they have values (these are the only truly optional fields in the schema)
    const atk = formData.get("atk") as string;
    if (atk && atk !== "") {
      cardData.atk = Number.parseInt(atk);
    }

    const def = formData.get("def") as string;
    if (def && def !== "") {
      cardData.def = Number.parseInt(def);
    }

    const level = formData.get("level") as string;
    if (level && level !== "") {
      cardData.level = Number.parseInt(level);
    }

    const race = formData.get("race") as string;
    if (race && race !== "") {
      cardData.race = race.trim();
    }

    const attribute = formData.get("attribute") as string;
    if (attribute && attribute !== "") {
      cardData.attribute = attribute.trim();
    }

    const price = formData.get("price") as string;
    if (price && price !== "") {
      cardData.price = Number.parseInt(price);
    }

    // Check if card ID already exists
    const existingCard = await Cards.findOne({ name: cardData.name });
    if (existingCard) {
      return { success: false, error: "A card with this name already exists" };
    }

    // Create the new card
    const newCard = new Cards(cardData);
    await newCard.save();

    // Reset form by redirecting to the same page
    if (session.user?.id) {
      redirect(`/profile/${session.user.id}/cards/new`);
    } else {
      redirect(`/profile`);
    }
  } catch (error) {
    console.error("Error creating card:", error);
    return { success: false, error: "Failed to create card. Please try again." };
  }
}
