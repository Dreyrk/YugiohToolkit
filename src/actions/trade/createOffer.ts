"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/database/db";
import TradeOffers from "@/lib/database/models/trade/tradeOffer.model";
import TradeProposals from "@/lib/database/models/trade/tradeProposal.model";
import { getSession } from "../auth/getSession";
import { TradeFormSchema } from "@/schemas";

export async function createTradeOffer(proposalId: string, formData: FormData) {
  try {
    await db();

    const session = await getSession();
    if (!session?.user?.id) {
      throw new Error("Vous devez être connecté pour faire une offre.");
    }
    const offererId = session.user.id;

    const proposal = await TradeProposals.findById(proposalId);

    if (!proposal) {
      throw new Error("La proposition n'existe pas.");
    }
    if (proposal.status !== "active") {
      throw new Error("Vous ne pouvez plus faire d'offre sur cette proposition.");
    }
    if (proposal.proposer.toString() === offererId) {
      throw new Error("Vous ne pouvez pas faire d'offre sur votre propre proposition.");
    }

    const validatedData = TradeFormSchema.parse({
      masterCardId: formData.get("masterCardId"),
      condition: formData.get("condition"),
      language: formData.get("language"),
      notes: formData.get("notes"),
    });

    await TradeOffers.create({
      proposal: proposalId,
      offerer: offererId,
      masterCard: validatedData.masterCardId,
      cardDetails: {
        condition: validatedData.condition,
        language: validatedData.language,
        notes: validatedData.notes,
      },
    });

    revalidatePath(`/`);
  } catch (error) {
    console.error("Erreur lors de la création de l'offre:", error);
    return { message: "Une erreur est survenue lors de la création de l'offre." };
  }

  return { success: true, message: "Offre envoyée avec succès !" };
}
