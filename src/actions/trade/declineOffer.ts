"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/database/db";
import TradeOffers from "@/lib/database/models/trade/tradeOffer.model";
import { getSession } from "../auth/getSession";

export async function declineTradeOffer(offerId: string) {
  try {
    await db();

    const session = await getSession();
    if (!session?.user?.id) throw new Error("Non authentifié.");
    const currentUserId = session.user.id;

    const offerToDecline = await TradeOffers.findById(offerId).populate("proposal");
    if (!offerToDecline) throw new Error("Offre introuvable.");
    if (offerToDecline.proposal.proposer.toString() !== currentUserId) {
      throw new Error("Action non autorisée.");
    }

    offerToDecline.status = "declined_by_user";
    await offerToDecline.save();

    revalidatePath(`/`);
  } catch (error) {
    console.error("Erreur lors du refus de l'offre:", error);
    return { message: "Une erreur est survenue." };
  }

  return { success: true };
}
