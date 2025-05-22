"use client";

import { SessionUser, YugiCards } from "@/types";
import ExtraDeck from "./ExtraDeck";
import MainDeck from "./MainDeck";
import SideDeck from "./SideDeck";
import useDeckContext from "@/context/DeckContext";
import CreateDeckBtn from "../CreateDeckBtn";
import { GrPowerReset } from "react-icons/gr";
import getDeckLength from "@/utils/getDeckLength";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "react-toastify";

export default function DeckBuilder({
  mainCards,
  extraCards,
  sideCards,
  user,
}: {
  mainCards: YugiCards[] | null;
  extraCards: YugiCards[] | null;
  sideCards: YugiCards[] | null;
  user: SessionUser | null;
}) {
  const { deck, dispatch } = useDeckContext();
  const [, , deleteStoredValue] = useLocalStorage("deck");

  const deckLength = getDeckLength(deck);

  return (
    <div className="flex flex-col justify-between py-10 mx-8">
      <div className="flex justify-between w-full">
        <div className="w-fit px-4 flex flex-col gap-2">
          <label className="text-white font-semibold" htmlFor="name">
            Nom du Deck :
          </label>
          <input
            className="py-1 px-2 rounded-lg placeholder:italic bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="name"
            value={deck.name || ""}
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
          onClick={() => {
            dispatch({ type: "RESET" });
            deleteStoredValue();
            toast.success("Deck reset successfully");
          }}
          className="bg-slate-100 p-2 h-12 w-12 rounded-full grid place-content-center"
          type="button">
          <span className="hover:animate-spin">
            <GrPowerReset size={30} color="black" />
          </span>
        </button>
      </div>
      {mainCards && <MainDeck allCards={mainCards} />}
      {extraCards && <ExtraDeck allCards={extraCards} />}
      {sideCards && <SideDeck allCards={sideCards} />}
      <div>
        <p className="text-white text-lg font-medium">
          Deck Length: <span className={`text-${deckLength < 40 && "red-600"}`}>{deckLength}</span>
        </p>
      </div>
      <CreateDeckBtn user={user} />
    </div>
  );
}
