"use client";

import { useState, useTransition } from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { toast } from "react-toastify";
import { AuthProps } from "@/types";
import { signup } from "@/actions/auth/register";
import FormInput from "../FormInput";

const signupFields = [
  {
    id: "pseudo",
    label: "Pseudo",
    type: "text",
    name: "pseudo",
    logo: AiOutlineUser,
    placeholder: "Choisissez un pseudo",
    autoComplete: "username",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    name: "email",
    logo: AiOutlineMail,
    placeholder: "Entrez votre email",
    autoComplete: "email",
  },
  {
    id: "password",
    label: "Mot de passe",
    type: "password",
    name: "password",
    logo: AiOutlineLock,
    placeholder: "Entrez votre mot de passe",
    autoComplete: "new-password",
  },
  {
    id: "confirm-password",
    label: "Confirmer le mot de passe",
    type: "password",
    name: "confirm-password",
    logo: AiOutlineLock,
    placeholder: "Confirmez votre mot de passe",
    autoComplete: "new-password",
  },
] as const;

export default function Signup({ setRegistered }: AuthProps) {
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await signup(formData);

      if (result.errors) {
        setErrors(result.errors);
        toast.warn("Veuillez corriger les erreurs dans le formulaire.");
      } else if (result.error) {
        setErrors({ email: result.error }); // Fallback pour erreurs génériques
        toast.warn(result.error);
      } else {
        toast.success("Inscription réussie !");
        setRegistered(true);
      }
    });
  };

  return (
    <form
      action={handleSubmit}
      className="flex flex-col items-center rounded-lg bg-slate-100 max-w-sm justify-center gap-12 p-6"
      aria-labelledby="signup-title">
      <h1 id="signup-title" className="m-0 text-2xl font-bold text-black">
        Inscription
      </h1>
      {signupFields.map((field) => (
        <div key={field.id} className="w-full">
          <FormInput
            id={field.id}
            label={field.label}
            type={field.type}
            name={field.name}
            Logo={field.logo}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            error={errors[field.id]}
            aria-invalid={Boolean(errors[field.id])}
            aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
            aria-required={true}
          />
        </div>
      ))}
      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-1 text-lg font-semibold hover:text-slate-300 text-slate-50 bg-indigo-500 rounded-2xl disabled:opacity-50"
        aria-busy={isPending}>
        {isPending ? "Inscription..." : "S'inscrire"}
      </button>
      <button
        type="button"
        onClick={() => setRegistered(true)}
        className="underline mb-2 text-black hover:text-slate-300"
        aria-label="Passer au formulaire de connexion">
        Déjà un compte ?
      </button>
    </form>
  );
}
