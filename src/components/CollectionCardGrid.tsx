import CollectionYugiCard from "./cards/CollectionYugiCard";
import type { CollectionYugiCard as YugiCards } from "@/types";
interface CollectionCardGridProps {
  cards: YugiCards[];
  selectedCards: YugiCards[];
  onCardSelect: (card: YugiCards) => void;
}

export default function CollectionCardGrid({ cards, selectedCards, onCardSelect }: CollectionCardGridProps) {
  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No cards found. Try adjusting your search filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
      {cards.map((card) => (
        <CollectionYugiCard key={card.id} card={card} selectedCards={selectedCards} onCardSelect={onCardSelect} />
      ))}
    </div>
  );
}
