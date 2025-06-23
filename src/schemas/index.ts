import { z } from "zod";

export const TradeFormSchema = z.object({
  masterCardId: z.string().min(1, "Vous devez sélectionner une carte."),
  condition: z.enum(["Neuf", "Quasi neuf", "Peu joué", "Joué", "Abîmé"]),
  language: z.enum(["FR", "EN", "DE", "JP", "IT", "ES"]),
  notes: z.string().max(250, "Les notes ne peuvent pas dépasser 250 caractères.").optional(),
});
