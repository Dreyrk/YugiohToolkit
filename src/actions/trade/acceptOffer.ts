"use server";

import { revalidatePath } from "next/cache";
import { startSession } from "mongoose";
import db from "@/lib/database/db";
import TradeOffers from "@/lib/database/models/trade/tradeOffer.model";
import TradeProposals from "@/lib/database/models/trade/tradeProposal.model";
import { getSession } from "../auth/getSession";

export async function acceptTradeOffer(offerId: string) {
  const session = await startSession();
  session.startTransaction();

  try {
    await db();

    const authSession = await getSession();
    if (!authSession?.user?.id) throw new Error("Non authentifié.");
    const currentUserId = authSession.user.id;

    const offerToAccept = await TradeOffers.findById(offerId).session(session);
    if (!offerToAccept) throw new Error("Offre introuvable.");

    const proposal = await TradeProposals.findById(offerToAccept.proposal).session(session);
    if (!proposal) throw new Error("Proposition parente introuvable.");

    if (proposal.proposer.toString() !== currentUserId) {
      throw new Error("Action non autorisée.");
    }

    offerToAccept.status = "accepted";
    await offerToAccept.save({ session });

    proposal.status = "completed";
    proposal.acceptedOffer = offerToAccept._id;
    await proposal.save({ session });

    await TradeOffers.updateMany(
      { proposal: proposal._id, _id: { $ne: offerToAccept._id } },
      { $set: { status: "declined_by_system" } },
      { session }
    );

    await session.commitTransaction();

    revalidatePath("/");
  } catch (error) {
    await session.abortTransaction();
    console.error("Erreur lors de l'acceptation de l'offre:", error);
    return { message: "Une erreur est survenue." };
  } finally {
    session.endSession();
  }

  return { success: true };
}
