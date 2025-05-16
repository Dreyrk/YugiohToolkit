import { Deck } from "@/types";
import Image from "next/image";
import Link from "next/link";
import DeleteDeckBtn from "../DeleteDeckBtn";
import deleteUserDeck from "@/actions/deleteUserDeck";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function DeckBox({
  deck,
  userId,
}: {
  deck: Deck;
  userId: string;
}) {
  const deckCover = Boolean(deck.extra[0])
    ? deck.extra[0].img
    : deck.main[0].img;

  const deleteDeck = async () => {
    "use server";
    await deleteUserDeck(userId, deck.id);
    revalidatePath("/profile/[userId]/decks");
    redirect("/");
  };
  return (
    <div className="relative">
      <form className="absolute top-1 right-1" action={deleteDeck}>
        <DeleteDeckBtn type="button" />
      </form>
      <Link href={`decks/${deck.id}`}>
        <div className="h-full w-60 bg-slate-200 flex flex-col items-center z-0">
          <Image
            src={deckCover}
            alt="firstCard"
            width={1000}
            height={1000}
            blurDataURL={`${deckCover}`}
          />
          <div className="absolute bottom-0 left-0 w-full h-1/3 p-6 flex flex-col gap-4 bg-transparent backdrop-brightness-50 backdrop-blur-sm z-30">
            <h1 className="text-xl text-slate-100 font-semibold">
              {deck.name}
            </h1>
            <span className="text-slate-100 font-light text-xs">
              Deck length : {deck.main.length + deck.extra.length} cards
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
