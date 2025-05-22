"use server";

import { cookies } from "next/headers";
import db from "@/lib/database/db";
import Users from "@/lib/database/models/users.model";
import { lucia } from "@/lib/auth";

export async function getSession() {
  const cookieStore = await cookies();
  try {
    // Récupérer le cookie de session
    const sessionId = cookieStore.get(lucia.sessionCookieName)?.value;
    if (!sessionId) {
      return { user: null, error: null, invalidate: false };
    }

    // Valider la session avec Lucia
    const { session, user } = await lucia.validateSession(sessionId);
    if (!session || !user) {
      // Indiquer que la session est invalide et doit être supprimée
      return { user: null, error: null, invalidate: true };
    }

    // Connexion à la base de données
    await db();

    // Récupérer les informations utilisateur
    const dbUser = await Users.findById(user.id).select("pseudo email");
    if (!dbUser) {
      // Indiquer que l'utilisateur n'existe pas et que la session doit être invalidée
      await lucia.invalidateSession(sessionId);
      return { user: null, error: null, invalidate: true };
    }

    // Retourner les informations de l'utilisateur
    return {
      user: {
        id: user.id.toString(),
        pseudo: dbUser.pseudo,
        email: dbUser.email,
      },
      error: null,
      invalidate: false,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération de la session:", error);
    return { user: null, error: "Erreur serveur", invalidate: false };
  }
}
