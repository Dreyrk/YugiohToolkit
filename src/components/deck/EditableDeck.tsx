"use client";

import { useState } from "react";
import Image from "next/image";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { DeckSectionType, DeckType, YugiCards } from "@/types";
import useDeckContext from "@/context/DeckContext";
import AddToDeckModal from "../AddToDeckModal";

export default function EditableDeck() {
  const { deck, dispatch } = useDeckContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDeckType, setModalDeckType] = useState<DeckType>("main");

  const openModal = (deckType: DeckType) => {
    setModalDeckType(deckType);
    setIsModalOpen(true);
  };

  const deckSections: DeckSectionType[] = [
    { title: "Main Deck", type: "main", cards: deck.main },
    { title: "Extra Deck", type: "extra", cards: deck.extra },
    { title: "Side Deck", type: "side", cards: deck.side },
  ];

  return (
    <div className="p-4 md:p-6">
      {isModalOpen && <AddToDeckModal setIsOpen={setIsModalOpen} deckType={modalDeckType} />}

      {deckSections.map((section) => (
        <section key={section.type} className={`${section.type}-deck mb-8`}>
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-600">
            <h3 className="text-xl font-bold text-slate-200">
              {section.title} ({section.cards.length})
            </h3>
            <button
              onClick={() => openModal(section.type)}
              className="text-green-400 hover:text-green-300 transition-colors"
              aria-label={`Ajouter une carte à ${section.title}`}>
              <FaPlusCircle size={24} />
            </button>
          </div>
          <div className="deck-display">
            {section.cards.length > 0 ? (
              section.cards.map((card, i) => (
                <DisplayCard
                  key={`${card.id}-${i}`}
                  card={card}
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_CARD",
                      payload: { cardId: card.id, deckType: section.type },
                    })
                  }
                />
              ))
            ) : (
              <p className="lg:col-start-3 text-slate-400">
                {`Le ${section.type} deck est vide. Ajoutez des cartes avec le bouton +.`}
              </p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

function DisplayCard({ card, onClick }: { card: YugiCards; onClick: () => void }) {
  return (
    <div key={card.id} className="relative group">
      <Image src={card.img} alt={card.name} width={180} height={260} className="rounded" />
      <button
        onClick={onClick}
        className="absolute -top-1.5 -right-1.5 p-1 bg-red-600 hover:bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={`Retirer ${card.name}`}>
        <FaTrash size={12} />
      </button>
    </div>
  );
}
