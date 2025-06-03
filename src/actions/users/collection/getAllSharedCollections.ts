"use server";

import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";
import { Collection } from "@/types";

export default async function getAllSharedCollections(userId: string): Promise<Collection[]> {
  try {
    await db();

    const collectionOwner = await Users.findById(userId).select("collections");

    const collections = collectionOwner.collections.filter((collection: Collection) => collection.isSharable);

    return JSON.parse(JSON.stringify(collections));
  } catch (e) {
    throw new Error(`Cannot get user shared collections: ${(e as Error).message}`);
  }
}
