"use server";

import { getSession } from "@/actions/auth/getSession";
import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";
import { Collection } from "@/types";

export default async function deleteUserCollection(collectionId: string) {
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

    const collectionsUpdated = user.collections.filter((c: Collection) =>
      c._id ? c._id.toString() !== collectionId : c.id !== collectionId
    );

    user.collections = collectionsUpdated;

    await user.save();

    return { success: true };
  } catch (e) {
    console.error("Error deleting collection:", e);
    return { error: `Cannot delete collection: ${(e as Error).message}` };
  }
}
