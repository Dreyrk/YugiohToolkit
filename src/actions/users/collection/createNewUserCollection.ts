"use server";

import { getSession } from "@/actions/auth/getSession";
import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";
import { Collection } from "@/types";

export default async function createNewUserCollection(newCollection: Omit<Collection, "id" | "_id">) {
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

    user.collections.push(newCollection);

    await user.save();

    const newUser = await Users.findById(session.user.id);

    const { _id: id } = newUser.collection.find((c: Collection) => c.name === newCollection.name);

    return { success: true, id };
  } catch (e) {
    console.error("Error creating collection:", e);
    return { error: `Cannot create collection: ${(e as Error).message}` };
  }
}
