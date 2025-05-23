"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import useDeckContext from "@/context/DeckContext";
import { AddToDeckModalProps, YugiCards } from "@/types";
import YugiCard from "./cards/YugiCard";
import Loader from "./Loader";
import FiltersBar from "./FiltersBar";

export default function AddToDeckModal({ setIsOpen, deckType, allCards }: AddToDeckModalProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const { deck, dispatch } = useDeckContext();
  const [selectedCards, setSelectedCards] = useState(deck[deckType]);
  const [displayedCards, setDisplayedCards] = useState<YugiCards[]>(allCards.slice(0, 60));
  const [visibleCardCount, setVisibleCardCount] = useState(12);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  useMemo(() => {
    const searchedCards = allCards
      .filter((card) => card.name.toLowerCase().includes(deferredSearch.toLowerCase()))
      .slice(0, 60);
    setDisplayedCards(searchedCards);
  }, [deferredSearch, allCards]);

  useEffect(() => {
    const list = listRef.current;
    const loadMoreCards = () => {
      const nextBatch = displayedCards.slice(visibleCardCount, visibleCardCount * 4);
      setDisplayedCards([...displayedCards, ...nextBatch]);
      setVisibleCardCount(visibleCardCount + 10);
    };

    const handleScroll = () => {
      if (list) {
        if (list.scrollTop + 20 >= list.scrollHeight - list.clientHeight) {
          loadMoreCards();
        }
      }
    };

    if (list) {
      list.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (list) {
        list.removeEventListener("scroll", handleScroll);
      }
    };
  }, [displayedCards, listRef, visibleCardCount]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const addToDeck = () => {
    if (deckType === "main" || deckType === "extra" || deckType === "side") {
      dispatch({
        type: "ADD_CARD",
        payload: { cards: selectedCards, deckType },
      });
      closeModal();
    }
  };

  return (
    <motion.dialog
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClose={closeModal}
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center h-screen w-screen modal-overlay backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-neutral-700 text-slate-100 max-w-[950px] w-[90vw] max-h-[85vh] p-6 flex flex-col justify-between rounded-lg shadow-lg overflow-hidden relative">
        <button
          onClick={closeModal}
          type="button"
          aria-label="Close modal"
          className="absolute top-3 right-4 text-white hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full">
          <AiOutlineCloseCircle size={28} />
        </button>

        <div className="flex justify-between items-center mt-5 mb-4">
          <h2 className="text-2xl font-semibold px-2">
            <span style={{ color: `var(--deck-${deckType})` }} className="capitalize">
              {deckType}
            </span>{" "}
            Deck
          </h2>
          <button
            onClick={addToDeck}
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 rounded-full text-white transition">
            <span className="font-semibold">Ajouter</span>
            <AiFillCheckCircle size={24} color="white" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-6 px-4 py-4">
          <input
            id="search"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
            className="w-5/6 rounded-md p-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <FiltersBar cards={allCards} setCards={setDisplayedCards} />
        </div>

        <ul
          ref={listRef}
          className={`z-30 h-full w-full overflow-y-auto overflow-x-hidden grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 scrollbar-${deckType}`}>
          {allCards ? (
            displayedCards.map((card, i) => (
              <li key={card.id + i} className="m-0">
                <YugiCard selectedCards={selectedCards} setSelectedCards={setSelectedCards} card={card} />
              </li>
            ))
          ) : (
            <Loader />
          )}
        </ul>
      </motion.div>
    </motion.dialog>
  );
}
