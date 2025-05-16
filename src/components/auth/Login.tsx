// components/Login.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { toast } from "react-toastify";
import { AuthProps } from "@/types";
import { login } from "@/actions/auth/login";
import FormInput from "../FormInput";

// Configuration des champs
const loginFields = [
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
    autoComplete: "current-password",
  },
] as const;

export default function Login({ setRegistered }: AuthProps) {
  const router = useRouter();
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await login(formData);

      if (result.errors) {
        setErrors(result.errors);
        toast.warn("Veuillez corriger les erreurs dans le formulaire.");
      } else if (result.error) {
        setErrors({ email: result.error });
        toast.warn(result.error);
      } else {
        toast.success("Connexion réussie !");
        router.push("/profile");
      }
    });
  };

  return (
    <form
      action={handleSubmit}
      className="flex flex-col items-center rounded-lg bg-slate-100 max-w-sm justify-center gap-12 p-6"
      aria-labelledby="login-title">
      <h1 id="login-title" className="m-0 text-2xl font-bold text-black">
        Se connecter
      </h1>
      {loginFields.map((field) => (
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
        {isPending ? "Connexion..." : "Se connecter"}
      </button>
      <button
        type="button"
        onClick={() => setRegistered(false)}
        className="underline mb-2 text-black hover:text-slate-300"
        aria-label="Passer au formulaire d'inscription">
        Pas encore de compte ?
      </button>
    </form>
  );
}
