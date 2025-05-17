"use server";

import { getSession } from "@/actions/auth/getSession";
import getDecks from "@/actions/users/deck/getDecks";
import DeckBox from "@/components/deck/DeckBox";
import { Deck } from "@/types";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { userId: string } }) {
  const session = await getSession();
  const { userId } = params;
  const userDecks = await getDecks(userId);

  if (session.user && session?.user.id === userId) {
    return (
      <div className="px-8 pt-8">
        <h1 className="text-3xl font-semibold text-slate-100 underline">Decks :</h1>
        {userDecks.length ? (
          <ul className="flex flex-wrap gap-10 my-10  max-sm:justify-center">
            {userDecks.map((deck: Deck) => (
              <DeckBox userId={userId} deck={deck} key={deck.id} />
            ))}
          </ul>
        ) : (
          <div className="grid place-content-center h-40">
            <h1 className="text-xl text-white">Pas de Decks</h1>
          </div>
        )}
      </div>
    );
  } else {
    redirect("/authenticate");
  }
}
