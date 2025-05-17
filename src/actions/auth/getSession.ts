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
      return { user: null, error: null };
    }

    // Valider la session avec Lucia
    const { session, user } = await lucia.validateSession(sessionId);
    if (!session || !user) {
      // Supprimer le cookie si la session est invalide
      cookieStore.set(
        lucia.createBlankSessionCookie().name,
        lucia.createBlankSessionCookie().value,
        lucia.createBlankSessionCookie().attributes
      );
      return { user: null, error: null };
    }

    // Connexion à la base de données
    await db();

    // Récupérer les informations utilisateur
    const dbUser = await Users.findById(user.id).select("pseudo email");
    if (!dbUser) {
      // Si l'utilisateur n'existe pas, invalider la session
      await lucia.invalidateSession(sessionId);
      cookieStore.set(
        lucia.createBlankSessionCookie().name,
        lucia.createBlankSessionCookie().value,
        lucia.createBlankSessionCookie().attributes
      );
      return { user: null, error: null };
    }

    // Retourner les informations de l'utilisateur
    return {
      user: {
        id: user.id.toString(),
        pseudo: dbUser.pseudo,
        email: dbUser.email,
      },
      error: null,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération de la session:", error);
    return { user: null, error: "Erreur serveur" };
  }
}
