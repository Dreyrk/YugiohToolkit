"use client";

import AnimatedText from "@/components/AnimatedText";
import DeckBuilder from "@/components/deck/DeckBuilder";
import { SessionUser } from "@/types";
import DeckContextProvider from "@/context/DeckContextProvider";

type Props = {
  user: SessionUser | null;
};

export default function DeckClient({ user }: Props) {
  return (
    <>
      <AnimatedText text="Construis ton deck !" />
      <DeckContextProvider>
        <DeckBuilder user={user} />
      </DeckContextProvider>
    </>
  );
}
