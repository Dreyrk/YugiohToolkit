"use server";

import db from "@/lib/database/db";
import TradeProposals from "@/lib/database/models/trade/tradeProposal.model";

export async function getActiveTradeProposals(searchQuery: string = "") {
  try {
    await db();

    // Critères de recherche : sur le nom de la carte
    const searchCriteria = searchQuery ? { "populatedCard.name": { $regex: searchQuery, $options: "i" } } : {};

    const proposals = await TradeProposals.aggregate([
      // 1. Filtrer uniquement les propositions actives
      { $match: { status: "active" } },
      // 2. Joindre les informations de la carte (masterCard)
      {
        $lookup: {
          from: "cards", // Le nom de votre collection de cartes
          localField: "masterCard",
          foreignField: "_id",
          as: "populatedCard",
        },
      },
      // 3. Joindre les informations de l'utilisateur (proposer)
      {
        $lookup: {
          from: "users", // Le nom de votre collection d'utilisateurs
          localField: "proposer",
          foreignField: "_id",
          as: "populatedUser",
        },
      },
      // 4. Aplatir les tableaux créés par $lookup
      { $unwind: "$populatedCard" },
      { $unwind: "$populatedUser" },
      // 5. Appliquer le filtre de recherche
      { $match: searchCriteria },
      // 6. Trier par date de création
      { $sort: { createdAt: -1 } },
      // 7. Formatter le document final
      {
        $project: {
          id: "$_id",
          status: 1,
          cardDetails: 1,
          createdAt: 1,
          card: {
            id: "$populatedCard._id",
            name: "$populatedCard.name",
            img: "$populatedCard.img",
            type: "$populatedCard.type",
          },
          proposer: {
            id: "$populatedUser._id",
            pseudo: "$populatedUser.pseudo",
            // avatar: '$populatedUser.avatar'
          },
          _id: 0,
        },
      },
    ]);

    return JSON.parse(JSON.stringify(proposals));
  } catch (error) {
    console.error("Failed to fetch trade proposals:", error);
    return [];
  }
}
