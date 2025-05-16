"use client";

import AnimatedText from "@/components/AnimatedText";
import DeckBuilder from "@/components/deck/DeckBuilder";
import { YugiCards, SessionUser } from "@/types";

type Props = {
  user: SessionUser | null;
  mainCards: YugiCards[];
  extraCards: YugiCards[];
  sideCards: YugiCards[];
};

export default function DeckClient({ user, mainCards, extraCards, sideCards }: Props) {
  return (
    <>
      <AnimatedText text="Build your own Deck !" />
      <DeckBuilder user={user} mainCards={mainCards} extraCards={extraCards} sideCards={sideCards} />
    </>
  );
}
