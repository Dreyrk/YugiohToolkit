import { CollectionYugiCard, YugiCards } from "@/types"; // Adaptez le chemin si nécessaire
import YugiCard from "../cards/YugiCard";
import { CardsSkeleton } from "../cards/CardSkeleton";

interface OfferCardSelectorProps {
  cards: CollectionYugiCard[];
  onCardSelect: (card: CollectionYugiCard) => void;
  isLoading: boolean;
}

export default function OfferCardSelector({ cards, onCardSelect, isLoading }: OfferCardSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-4 place-items-center">
      {isLoading
        ? Array.from({ length: 8 }).map((_, index) => <CardsSkeleton key={index} />)
        : cards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => onCardSelect(card)}
              className="rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 dark:focus:ring-offset-slate-900 group">
              <YugiCard card={card as unknown as YugiCards} />
            </button>
          ))}
    </div>
  );
}
