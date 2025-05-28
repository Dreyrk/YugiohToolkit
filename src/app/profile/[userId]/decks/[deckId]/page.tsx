import deleteDeck from "@/actions/users/deck/deleteDeck";
import getDeck from "@/actions/getDeck";
import { DeckEditorProvider } from "@/context/DeckEditorProvider";
import DeckDetailClient from "@/components/deck/DeckDetailClient";

export default async function Page({ params }: { params: Promise<{ userId: string; deckId: string }> }) {
  const { userId, deckId } = await params;

  const deck = await getDeck(userId, deckId);

  const deleteUserDeck = async () => {
    "use server";
    await deleteDeck(userId, deckId);
  };

  return (
    <DeckEditorProvider initialDeck={deck}>
      <DeckDetailClient deleteUserDeckAction={deleteUserDeck} />
    </DeckEditorProvider>
  );
}

{
  /* <div className="text-white pt-8">
      <div className="flex flex-wrap px-6">
        <h1 className="font-bold text-3xl basis-1/2">{deck.name}</h1>
        <div className="basis-1/2 flex justify-end">
          <EditDeckBtn type="button" />
          <form action={deleteUserDeck}>
            <DeleteDeckBtn type="submit" />
          </form>
        </div>
        <p className="shrink">Deck length: {deckLength}</p>
      </div>
      <DeckDisplayer deck={deck} />
    </div> */
}
