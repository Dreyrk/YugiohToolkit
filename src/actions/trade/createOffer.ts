"use server";

import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import db from "@/lib/database/db";
import TradeOffers from "@/lib/database/models/trade/tradeOffer.model";
import TradeProposals from "@/lib/database/models/trade/tradeProposal.model";
import { getSession } from "../auth/getSession";
import { TradeFormSchema } from "@/schemas";
import { FormState } from "@/types";

export async function createTradeOffer(prevState: FormState | undefined, formData: FormData): Promise<FormState> {
  try {
    await db();

    const proposalId = formData.get("proposalId") as string;
    if (!proposalId) {
      return { success: false, message: "ID de la proposition manquant." };
    }

    const session = await getSession();
    if (!session?.user?.id) {
      return { success: false, message: "Vous devez être connecté pour faire une offre." };
    }
    const offererId = session.user.id;

    const proposal = await TradeProposals.findById(proposalId);
    if (!proposal) {
      return { success: false, message: "La proposition n'existe pas." };
    }
    if (proposal.status !== "active") {
      return { success: false, message: "Vous ne pouvez plus faire d'offre sur cette proposition." };
    }
    if (proposal.proposer.toString() === offererId) {
      return { success: false, message: "Vous ne pouvez pas faire d'offre sur votre propre proposition." };
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

    return { success: true, message: "Offre envoyée avec succès !" };
  } catch (error) {
    console.error("Erreur lors de la création de l'offre:", error);
    if (error instanceof ZodError) {
      return {
        success: false,
        message: "Erreur de validation: " + error.errors.map((e) => e.message).join(", "),
      };
    }
    return { success: false, message: "Une erreur interne est survenue." };
  }
}
