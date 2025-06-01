import CollectionYugiCard from "./cards/CollectionYugiCard";
import type { CollectionYugiCard as YugiCard } from "@/types";
import Loader from "./Loader";

interface CollectionCardGridProps {
  cards: YugiCard[];
  selectedCards?: YugiCard[];
  onCardSelect?: (card: YugiCard) => void;
  onRemoveCard?: (card: YugiCard) => void;
  isEditMode?: boolean;
  isLoading?: boolean;
  showSelectionCounter?: boolean;
}

export default function CollectionCardGrid({
  cards,
  selectedCards,
  onCardSelect,
  onRemoveCard,
  isEditMode,
  isLoading,
  showSelectionCounter,
}: CollectionCardGridProps) {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <Loader absolute={false} />
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucune carte trouvée.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 place-items-center">
      {cards.map((card, i) => (
        <CollectionYugiCard
          key={`${i}-${card.id}`}
          card={card}
          selectedCards={selectedCards}
          onCardSelect={onCardSelect}
          onRemoveCard={onRemoveCard}
          isEditMode={isEditMode}
          showSelectionCounter={showSelectionCounter}
        />
      ))}
    </div>
  );
}
