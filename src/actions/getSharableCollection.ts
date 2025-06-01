"use server";

import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";
import { Collection } from "@/types";

export default async function getSharableCollection(
  userId: string,
  collectionId: string
): Promise<{ data?: Collection; success: boolean; error?: string }> {
  try {
    await db();

    const collectionOwner = await Users.findById(userId).select("collections");

    const collection = collectionOwner.collections.find(
      (collection: Collection) => collection._id.toString() === collectionId
    );

    if (!collection) {
      return { success: false, error: "404: not found" };
    }

    if (!collection.isSharable) {
      return { success: false, error: "This collection cannot be shared" };
    }

    return { success: true, data: JSON.parse(JSON.stringify(collection)) };
  } catch (e) {
    console.error(
      `failed to get sharable collection (user: ${userId}, collection: ${collectionId}): ${(e as Error).message}`
    );
    return { success: false, error: (e as Error).message };
  }
}
