// actions/users/deck/updateDeck.ts
"use server";

import { revalidatePath } from "next/cache";
import { Deck } from "@/types";
import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";
import { getSession } from "@/actions/auth/getSession";

export default async function updateDeck(deckId: string, deckData: Deck) {
  await db();

  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    const filter = {
      _id: session.user.id,
      "decks._id": deckId,
    };

    const update = {
      $set: {
        "decks.$.name": deckData.name,
        "decks.$.main": deckData.main,
        "decks.$.extra": deckData.extra,
        "decks.$.side": deckData.side,
      },
    };

    const result = await Users.updateOne(filter, update);

    if (result.matchedCount === 0) {
      throw new Error("Deck non trouvé ou droits insuffisants.");
    }

    revalidatePath(`/profile/${session.user.id}/decks/${deckId}`);
    revalidatePath(`/profile/${session.user.id}/decks`);

    return { success: true };
  } catch (error) {
    console.error("Erreur Mongoose lors de la mise à jour du deck:", error);
    throw new Error("La mise à jour du deck a échoué.");
  }
}
