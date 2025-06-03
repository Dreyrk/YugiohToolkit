/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { getSession } from "@/actions/auth/getSession";
import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";
import { Collection, CollectionYugiCard } from "@/types";
import { parseCollectionFilters } from "@/utils/extractSearchParams";

export default async function getUserCollectionById(
  collectionId: string,
  filters?: Record<string, string | undefined>
): Promise<Omit<Collection, "_id">> {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    await db();

    const user = (await Users.findById(session.user.id).select("collections").lean()) as {
      collections: Collection[];
    } | null;

    if (!user) {
      throw new Error("User not found");
    }

    let collection = user.collections.find((c) => c._id.toString() === collectionId || c.id === collectionId);

    if (!collection) {
      throw new Error("Collection not found");
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

    return {
      id: collection._id.toString() || collection.id,
      name: collection.name,
      description: collection.description,
      cards: collection.cards.map(({ _id, ...card }: CollectionYugiCard) => ({ ...card })),
      isSharable: collection.isSharable,
    };
  } catch (e) {
    throw new Error(`Error fetching collection: ${(e as Error).message}`);
  }
}
