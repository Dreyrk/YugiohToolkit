"use server";

import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";
import { Collection } from "@/types";
import { parseCollectionFilters } from "@/utils/extractSearchParams";

export default async function getSharableCollection(
  userId: string,
  collectionId: string,
  filters?: Record<string, string | undefined>
): Promise<{ data?: Collection; success: boolean; error?: string }> {
  try {
    await db();

    const collectionOwner = (await Users.findById(userId).select("collections")) as {
      collections: Collection[];
    } | null;

    if (!collectionOwner) {
      return { success: false, error: "404: not found" };
    }

    let collection = collectionOwner.collections.find(
      (collection: Collection) => collection._id.toString() === collectionId && collection.isSharable
    );

    if (!collection) {
      return { success: false, error: "404: not found" };
    }

    if (!collection.isSharable) {
      return { success: false, error: "This collection cannot be shared" };
    }

    let filteredCards = collection.cards;

    if (filters) {
      const filtersObject = parseCollectionFilters(filters);
      filteredCards = collection.cards.filter((card) => {
        // search par nom
        if (filtersObject.search) {
          if (!card.name.toLowerCase().includes(filtersObject.search.toLowerCase())) return false;
        }

        // filtrage par types
        if (filtersObject.types && filtersObject.types.length > 0) {
          if (!filtersObject.types.includes(card.type)) return false;
        }

        // filtrage par doublons
        if (filtersObject.onlyDuplicate) {
          if (!card.duplicate) return false;
        }

        return true;
      });
      collection = { ...collection, cards: filteredCards };
    }

    return { success: true, data: JSON.parse(JSON.stringify(collection)) };
  } catch (e) {
    console.error(
      `failed to get sharable collection (user: ${userId}, collection: ${collectionId}): ${(e as Error).message}`
    );
    return { success: false, error: (e as Error).message };
  }
}
