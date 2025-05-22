import Link from "next/link";
import getDecks from "@/actions/users/deck/getDecks";
import DeckBox from "@/components/deck/DeckBox";
import { Deck } from "@/types";
import { FaPlusCircle } from "react-icons/fa";

export default async function Page({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const userDecks = await getDecks(userId);

  return (
    <div className="px-8 pt-8">
      <h1 className="text-3xl font-semibold text-slate-100 underline">Decks :</h1>
      {userDecks.length ? (
        <ul className="flex flex-wrap gap-10 my-10 max-sm:justify-center">
          {userDecks.map((deck: Deck) => (
            <DeckBox userId={userId} deck={deck} key={deck.id} />
          ))}
        </ul>
      ) : (
        <div className="space-y-2 py-4 h-40">
          <h1 className="text-xl text-white">Pas de Decks</h1>
          <Link
            className="flex gap-2 items-center rounded-lg bg-black px-4 py-2 text-center text-lg font-semibold text-slate-100"
            href="/">
            <span>Nouveau deck</span>
            <FaPlusCircle size={20} />
          </Link>
        </div>
      )}
    </div>
  );
}
