/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { getSession } from "@/actions/auth/getSession";
import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";
import { Collection, CollectionYugiCard } from "@/types";

export default async function getUserCollections(): Promise<Collection[]> {
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

    const collections: Collection[] = user.collections.map((collection: any) => ({
      id: collection._id.toString(),
      name: collection.name,
      description: collection.description,
      cards: collection.cards.map(({ _id, ...card }: CollectionYugiCard) => ({ ...card })),
    }));

    return collections;
  } catch (e) {
    throw new Error(`Error fetching user collections: ${(e as Error).message}`);
  }
}
