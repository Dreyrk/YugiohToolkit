"use client";

import { SessionUser, YugiCards } from "@/types";
import ExtraDeck from "./ExtraDeck";
import MainDeck from "./MainDeck";
import SideDeck from "./SideDeck";
import useDeckContext from "@/context/DeckContext";
import DeckContextProvider from "@/context/DeckContextProvider";
import CreateDeckBtn from "../CreateDeckBtn";
import { GrPowerReset } from "react-icons/gr";
import getDeckLength from "@/utils/getDeckLength";

export default function DeckBuilder({
  mainCards,
  extraCards,
  sideCards,
  user,
}: {
  mainCards: YugiCards[];
  extraCards: YugiCards[];
  sideCards: YugiCards[];
  user: SessionUser | null;
}) {
  const { deck, dispatch } = useDeckContext();

  const deckLength = getDeckLength(deck);

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <DeckContextProvider>
      <div className="flex flex-col justify-between py-10 mx-8">
        <div className="flex justify-between w-full">
          <div className="w-fit px-4 flex flex-col gap-2">
            <label className="text-white font-semibold" htmlFor="name">
              Nom du Deck :
            </label>
            <input
              className="py-1 px-2 rounded-lg placeholder:italic"
              type="text"
              id="name"
              value={deck.name}
              onChange={(e) =>
                dispatch({
                  type: "CHANGE_NAME",
                  payload: { name: e.target.value },
                })
              }
              placeholder="Dark Magician, Control Deck..."
              autoComplete="off"
            />
          </div>
          <button
            onClick={reset}
            className="bg-slate-100 p-2 h-12 w-12 rounded-full grid place-content-center"
            type="button">
            <span className="hover:animate-spin">
              <GrPowerReset size={30} color="black" />
            </span>
          </button>
        </div>
        <MainDeck allCards={mainCards} />
        <ExtraDeck allCards={extraCards} />
        <SideDeck allCards={sideCards} />
        <div>
          <p className="text-white text-lg font-medium">
            Deck Length: <span className={`text-${deckLength < 40 && "red-600"}`}>{deckLength}</span>
          </p>
        </div>
        <CreateDeckBtn user={user} />
      </div>
    </DeckContextProvider>
  );
}
