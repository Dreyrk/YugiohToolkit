import { YugiCards } from "@/types";
import StaticYugiCard from "../cards/StaticYugiCard";

export default function StaticDeck({
  deck,
  type,
}: {
  deck: YugiCards[];
  type: string;
}) {
  return (
    <section className={`${type}-deck`}>
      <div className="deck-display">
        {deck.length ? (
          deck.map((card: YugiCards, i: number) => (
            <StaticYugiCard card={card} key={card.id + i} />
          ))
        ) : (
          <p className="lg:col-start-3">{`No ${type} deck...`}</p>
        )}
      </div>
    </section>
  );
}
