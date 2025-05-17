"use client";

import { toast } from "react-toastify";
import { SessionUser } from "@/types";
import createDeck from "@/actions/users/deck/createDeck";
import useDeckContext from "@/context/DeckContext";
import isDeckValid from "@/utils/isDeckValid";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function CreateDeckBtn({ user }: { user: SessionUser | null }) {
  const { deck, dispatch } = useDeckContext();
  const [getStoredDeck, setStoredDeck, deleteStoredValue] = useLocalStorage("deck");

  const createUserDeck = async () => {
    const isValid = isDeckValid(deck);
    if (isValid && user) {
      const { success } = await createDeck(user.id, deck);

      if (success) {
        dispatch({ type: "RESET" });
        deleteStoredValue();
        toast.success("Deck Created !");
      }
    } else {
      toast.error("Connectez-vous pour utiliser cette fonctionnalité");
    }
  };

  if (user) {
    return (
      <button
        onClick={createUserDeck}
        className="bg-yellow-300 text-slate-900 text-lg font-semibold px-4 py-2 w-fit rounded-lg hover:text-slate-100 self-center mt-8"
        type="button">
        Créer
      </button>
    );
  } else {
    return (
      <p className="text-red-600 font-semibold text-lg self-center mt-10">Compte nécessaire pour créer son deck</p>
    );
  }
}
