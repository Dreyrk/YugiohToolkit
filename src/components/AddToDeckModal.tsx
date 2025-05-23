"use client";

import { useEffect, useRef, useState, useDeferredValue } from "react";
import { motion } from "framer-motion";
import { AiOutlineCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import useDeckContext from "@/context/DeckContext";
import { AddToDeckModalProps, CardFiltersQuery, YugiCards } from "@/types";
import YugiCard from "./cards/YugiCard";
import Loader from "./Loader";
import FiltersBar from "./FiltersBar";

export default function AddToDeckModal({ setIsOpen, deckType }: AddToDeckModalProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const { deck, dispatch } = useDeckContext();
  const [selectedCards, setSelectedCards] = useState(deck[deckType]);
  const [displayedCards, setDisplayedCards] = useState<YugiCards[]>([]);

  const emptyFilters = {
    search: "",
    page: 1,
    limit: 60,
    deckType,
    types: [],
  };
  const [filters, setFilters] = useState<CardFiltersQuery>(emptyFilters);

  const deferredSearch = useDeferredValue(filters.search);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            params.append(key, value.join(","));
          } else {
            params.append(key, String(value));
          }
        });
        const res = await fetch(`/api/cards?${params.toString()}`);
        const data = await res.json();
        setDisplayedCards((prev) => (filters.page === 1 ? data : [...prev, ...data]));
        setHasMore(data.length === filters.limit);
      } catch (err) {
        console.error("Failed to fetch cards:", err);
      }
      setIsLoading(false);
    };

    fetchCards();
  }, [filters]);

  // Scroll infini
  useEffect(() => {
    const list = listRef.current;
    const handleScroll = () => {
      if (!list || isLoading || !hasMore) return;
      if (list.scrollTop + 20 >= list.scrollHeight - list.clientHeight) {
        setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
      }
    };

    list?.addEventListener("scroll", handleScroll);
    return () => list?.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  // Réinitialiser à la recherche
  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: deferredSearch, page: 1 }));
    setDisplayedCards([]);
    setHasMore(true);
  }, [deferredSearch]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
    setDisplayedCards([]);
    setHasMore(true);
  };

  const closeModal = () => setIsOpen(false);

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
        className="bg-neutral-700 text-slate-100 max-w-[950px] w-[90vw] h-[85vh] p-6 flex flex-col justify-between rounded-lg shadow-lg overflow-hidden relative">
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
            value={filters.search}
            onChange={(e) => setFilters((prev: CardFiltersQuery) => ({ ...prev, search: e.target.value }))}
            autoComplete="off"
            className="w-5/6 rounded-md p-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <FiltersBar filters={filters} onChange={(filters) => handleFilterChange(filters)} />
        </div>

        <ul
          ref={listRef}
          className={`z-30 h-full w-full overflow-y-auto overflow-x-hidden grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 scrollbar-${deckType}`}>
          {displayedCards.map((card, i) => (
            <li key={card.id + i} className="m-0">
              <YugiCard selectedCards={selectedCards} setSelectedCards={setSelectedCards} card={card} />
            </li>
          ))}
        </ul>
        {isLoading && <Loader />}
      </motion.div>
    </motion.dialog>
  );
}
