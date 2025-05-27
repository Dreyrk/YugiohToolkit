import { redirect } from "next/navigation";
import deleteDeck from "@/actions/users/deck/deleteDeck";
import getDeck from "@/actions/getDeck";
import getDeckLength from "@/utils/getDeckLength";
import DeleteDeckBtn from "@/components/DeleteDeckBtn";
import EditDeckBtn from "@/components/buttons/EditDeckBtn";
import DeckDisplayer from "@/components/deck/DeckDisplayer";

export default async function Page({ params }: { params: Promise<{ userId: string; deckId: string }> }) {
  const { userId, deckId } = await params;

  const deck = await getDeck(userId, deckId);

  const deleteUserDeck = async () => {
    "use server";
    const { success } = await deleteDeck(userId, deckId);
    if (success) {
      redirect(`/profile/${userId}/decks`);
    } else {
      throw new Error("Something wrong on deck deletion");
    }
  };

  const deckLength = getDeckLength(deck);

  return (
    <div className="text-white pt-8">
      <div className="flex flex-wrap px-6">
        <h1 className="font-bold text-3xl basis-1/2">{deck.name}</h1>
        <form action={deleteUserDeck} className="basis-1/2 flex justify-end">
          <EditDeckBtn type="button" />
          <DeleteDeckBtn type="submit" />
        </form>
        <p className="shrink">Deck length: {deckLength}</p>
      </div>
      <DeckDisplayer deck={deck} />
    </div>
  );
}
