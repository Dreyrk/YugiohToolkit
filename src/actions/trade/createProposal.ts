"use server";

import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import db from "@/lib/database/db";
import TradeProposals from "@/lib/database/models/trade/tradeProposal.model";
import { getSession } from "../auth/getSession";
import { TradeFormSchema } from "@/schemas";

type FormState = {
  message: string;
  success?: boolean;
};
export async function createTradeProposal(prevState: FormState | undefined, formData: FormData): Promise<FormState> {
  try {
    await db();

    const session = await getSession();
    if (!session?.user?.id) {
      return { success: false, message: "Vous devez être connecté pour créer une proposition." };
    }
    const proposerId = session.user.id;

    const validatedData = TradeFormSchema.parse({
      masterCardId: formData.get("masterCardId"),
      condition: formData.get("condition"),
      language: formData.get("language"),
      notes: formData.get("notes"),
    });

    await TradeProposals.create({
      proposer: proposerId,
      masterCard: validatedData.masterCardId,
      cardDetails: {
        condition: validatedData.condition,
        language: validatedData.language,
        notes: validatedData.notes,
      },
    });

    revalidatePath(`/profile/${proposerId}/social/trade`);

    return { success: true, message: "Proposition créée avec succès !" };
  } catch (error) {
    console.error("Erreur lors de la création de la proposition:", error);
    if (error instanceof ZodError) {
      return {
        success: false,
        message: "Erreur de validation: " + error.errors.map((e) => e.message).join(", "),
      };
    }
    return { success: false, message: "Une erreur interne est survenue." };
  }
}
