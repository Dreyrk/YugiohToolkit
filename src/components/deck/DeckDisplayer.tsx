import { Deck } from "@/types";
import StaticDeck from "./StaticDeck";

export default function DeckDisplayer({ deck }: { deck: Deck }) {
  return (
    <>
      <StaticDeck deck={deck.main} type={"main"} />
      <StaticDeck deck={deck.extra} type={"extra"} />
      <StaticDeck deck={deck.side} type={"side"} />
    </>
  );
}
