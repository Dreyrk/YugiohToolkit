"use server";

import bcrypt from "bcrypt";
import { z } from "zod";
import Users from "@/lib/database/models/users.model";
import db from "@/lib/database/db";

const signupSchema = z
  .object({
    pseudo: z
      .string()
      .min(3, "Le pseudo doit contenir au moins 3 caractères")
      .max(20, "Le pseudo ne peut pas dépasser 20 caractères"),
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    "confirm-password": z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  })
  .refine((data) => data.password === data["confirm-password"], {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirm-password"],
  });

export async function signup(formData: FormData) {
  try {
    // Établir la connexion à la base
    await db();

    // Extraire et valider les données
    const data = {
      pseudo: formData.get("pseudo")?.toString(),
      email: formData.get("email")?.toString(),
      password: formData.get("password")?.toString(),
      "confirm-password": formData.get("confirm-password")?.toString(),
    };

    const parsedData = signupSchema.safeParse(data);
    if (!parsedData.success) {
      const fieldErrors = parsedData.error.flatten().fieldErrors;
      return {
        errors: {
          pseudo: fieldErrors.pseudo?.[0],
          email: fieldErrors.email?.[0],
          password: fieldErrors.password?.[0],
          "confirm-password": fieldErrors["confirm-password"]?.[0],
        },
      };
    }

    const { pseudo, email, password } = parsedData.data;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await Users.findOne({ $or: [{ email }, { pseudo }] });
    if (existingUser) {
      return {
        errors: {
          [existingUser.email === email ? "email" : "pseudo"]:
            existingUser.email === email ? "Cet email est déjà utilisé" : "Ce pseudo est déjà pris",
        },
      };
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    await Users.create({
      pseudo,
      email,
      password: hashedPassword,
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return { error: "Erreur serveur" };
  }
}
