"use server";

import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { z } from "zod";
import { lucia } from "@/lib/auth";
import Users from "@/lib/database/models/users.model";
import db from "@/lib/database/db";

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export async function login(formData: FormData) {
  const cookieStore = await cookies();
  try {
    // Établir la connexion à la base
    await db();

    // Extraire et valider les données
    const data = {
      email: formData.get("email")?.toString(),
      password: formData.get("password")?.toString(),
    };

    const parsedData = loginSchema.safeParse(data);
    if (!parsedData.success) {
      const fieldErrors = parsedData.error.flatten().fieldErrors;
      return {
        errors: {
          email: fieldErrors.email?.[0],
          password: fieldErrors.password?.[0],
        },
      };
    }

    const { email, password } = parsedData.data;

    const user = await Users.findOne({ email });
    if (!user) {
      return { errors: { email: "Email invalide" } };
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return { errors: { password: "Mot de passe incorrect" } };
    }

    // Créer la session
    const session = await lucia.createSession(user._id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    // Définir le cookie
    cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    return { error: "Erreur serveur" };
  }
}
