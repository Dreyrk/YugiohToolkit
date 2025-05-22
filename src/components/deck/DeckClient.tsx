"use client";

import AnimatedText from "@/components/AnimatedText";
import DeckBuilder from "@/components/deck/DeckBuilder";
import { YugiCards, SessionUser } from "@/types";
import Loader from "../Loader";

type Props = {
  user: SessionUser | null;
  mainCards: YugiCards[] | null;
  extraCards: YugiCards[] | null;
  sideCards: YugiCards[] | null;
};

export default function DeckClient({ user, mainCards, extraCards, sideCards }: Props) {
  return (
    <>
      <AnimatedText text="Construis ton deck !" />
      {!mainCards || !extraCards || !sideCards ? (
        <Loader />
      ) : (
        <DeckBuilder user={user} mainCards={mainCards} extraCards={extraCards} sideCards={sideCards} />
      )}
    </>
  );
}
