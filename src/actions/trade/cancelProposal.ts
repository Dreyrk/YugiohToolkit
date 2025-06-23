"use server";

import { revalidatePath } from "next/cache";
import { startSession } from "mongoose";
import db from "@/lib/database/db";
import TradeProposals from "@/lib/database/models/trade/tradeProposal.model";
import TradeOffers from "@/lib/database/models/trade/tradeOffer.model";
import { getSession } from "../auth/getSession";

export async function cancelTradeProposal(proposalId: string) {
  const session = await startSession();
  session.startTransaction();

  try {
    await db();

    const authSession = await getSession();
    if (!authSession?.user?.id) throw new Error("Non authentifié.");
    const currentUserId = authSession.user.id;

    const proposal = await TradeProposals.findById(proposalId).session(session);
    if (!proposal) throw new Error("Proposition introuvable.");
    if (proposal.proposer.toString() !== currentUserId) throw new Error("Action non autorisée.");
    if (proposal.status !== "active") throw new Error("Cette proposition n'est plus active.");

    proposal.status = "cancelled";
    await proposal.save({ session });

    await TradeOffers.updateMany({ proposal: proposal._id }, { $set: { status: "declined_by_system" } }, { session });

    await session.commitTransaction();

    revalidatePath("/");
  } catch (error) {
    await session.abortTransaction();
    console.error("Erreur lors de l'annulation:", error);
    return { message: "Une erreur est survenue." };
  } finally {
    session.endSession();
  }

  return { success: true };
}
