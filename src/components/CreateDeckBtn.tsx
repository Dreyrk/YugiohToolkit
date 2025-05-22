"use client";

import { toast } from "react-toastify";
import { SessionUser } from "@/types";
import createDeck from "@/actions/users/deck/createDeck";
import useDeckContext from "@/context/DeckContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import isDeckValid from "@/utils/isDeckValid";

export default function CreateDeckBtn({ user }: { user: SessionUser | null }) {
  const { deck, dispatch } = useDeckContext();
  const [, , deleteStoredValue] = useLocalStorage("deck");

  const createUserDeck = async () => {
    if (!isDeckValid(deck)) {
      return;
    }
    if (user && user.id) {
      const { success } = await createDeck(user.id, deck);

      if (success) {
        dispatch({ type: "RESET" });
        deleteStoredValue();
        toast.success("Deck Created !");
      }
    } else {
      toast.error("Connectez-vous pour utiliser cette fonctionnalité");
      return;
    }
  };

  if (user) {
    return (
      <button
        onClick={createUserDeck}
        className="bg-blue-600 text-slate-100 text-lg font-semibold px-4 py-2 w-fit rounded-lg hover:text-slate-300 self-center mt-8"
        type="button">
        Valider
      </button>
    );
  } else {
    return (
      <p className="text-red-600 font-semibold text-lg self-center mt-10">Compte nécessaire pour créer son deck</p>
    );
  }
}
