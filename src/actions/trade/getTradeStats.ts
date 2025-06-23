"use server";

import mongoose from "mongoose";
import db from "@/lib/database/db";
import TradeProposals from "@/lib/database/models/trade/tradeProposal.model";

export async function getTradeStats(userId: string) {
  try {
    await db();

    // Stat 1: Nombre total de propositions actives
    const activeProposalsCount = await TradeProposals.countDocuments({
      status: "active",
    });

    // Stat 2: Nombre total d'échanges complétés
    const completedTradesCount = await TradeProposals.countDocuments({
      status: "completed",
    });

    // Stat 3: Nombre de propositions créées par l'utilisateur connecté
    const userProposalsCount = await TradeProposals.countDocuments({
      proposer: new mongoose.Types.ObjectId(userId),
    });

    return {
      activeProposalsCount,
      completedTradesCount,
      userProposalsCount,
    };
  } catch (error) {
    console.error("Failed to fetch trade stats:", error);
    return {
      activeProposalsCount: 0,
      completedTradesCount: 0,
      userProposalsCount: 0,
    };
  }
}
