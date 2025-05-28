"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import updateDeck from "@/actions/users/deck/updateDeck";
import DeleteDeckBtn from "@/components/DeleteDeckBtn";
import EditDeckBtn from "@/components/buttons/EditDeckBtn";
import DeckDisplayer from "@/components/deck/DeckDisplayer";
import EditableDeck from "@/components/deck/EditableDeck";
import getDeckLength from "@/utils/getDeckLength";
import useDeckContext from "@/context/DeckContext";

export default function DeckDetailClient({ deleteUserDeckAction }: { deleteUserDeckAction: () => Promise<void> }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { deck, dispatch } = useDeckContext();

  const deckLength = getDeckLength(deck);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    dispatch({ type: "RESET" });
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { success } = await updateDeck(deck.id, deck);
      if (success) {
        toast.success("Deck sauvegardé avec succès !");
      }
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("La sauvegarde a échoué. Veuillez réessayer.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="text-white pt-8">
      <div className="flex flex-wrap items-center px-6 gap-y-2">
        {isEditing ? (
          <input
            type="text"
            value={deck.name}
            onChange={(e) => dispatch({ type: "CHANGE_NAME", payload: { name: e.target.value } })}
            className="font-bold text-3xl bg-gray-800 border border-gray-600 rounded p-1 basis-full md:basis-1/2"
          />
        ) : (
          <h1 className="font-bold text-3xl basis-full md:basis-1/2">{deck.name}</h1>
        )}

        <div className="basis-full md:basis-1/2 flex justify-start md:justify-end gap-2">
          {isEditing ? (
            <>
              <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-600 rounded px-4 py-2 font-semibold">
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 font-semibold disabled:bg-blue-900 disabled:cursor-not-allowed">
                {isSaving ? "Sauvegarde..." : "Sauvegarder"}
              </button>
            </>
          ) : (
            <>
              <div onClick={handleEdit} className="cursor-pointer">
                <EditDeckBtn type="button" />
              </div>
              <form action={deleteUserDeckAction}>
                <DeleteDeckBtn type="submit" />
              </form>
            </>
          )}
        </div>

        <p className="w-full text-sm mt-2">Deck length: {deckLength}</p>
      </div>

      <div className="mt-6">{isEditing ? <EditableDeck /> : <DeckDisplayer deck={deck} />}</div>
    </div>
  );
}
