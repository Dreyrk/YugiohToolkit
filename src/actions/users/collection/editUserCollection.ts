"use server";

import { getSession } from "@/actions/auth/getSession";
import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";
import { Collection } from "@/types";

export default async function editCollection(collectionUpdated: Omit<Collection, "_id">) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    await db();

    const user = await Users.findById(session.user.id);
    if (!user) {
      return { error: "User not found" };
    }

    const collection = user.collections.id(collectionUpdated.id);
    if (!collection) {
      return { error: "Collection not found" };
    }

    collection.name = collectionUpdated.name;
    collection.description = collectionUpdated.description;
    collection.cards = collectionUpdated.cards;
    collection.isSharable = collectionUpdated.isSharable;

    await user.save();

    return { success: true };
  } catch (e) {
    console.error("Error editing collection:", e);
    return { error: `Cannot edit collection: ${(e as Error).message}` };
  }
}
