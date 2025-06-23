import { TradeProposalListProps } from "@/types";
import TradeProposalCard from "./TradeProposalCard";

export default function TradeProposalList({ proposals }: TradeProposalListProps) {
  if (proposals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className=" text-slate-200 text-lg italic">Aucune proposition trouvée.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {proposals.map((proposal) => (
        <TradeProposalCard key={proposal.id} proposal={proposal} />
      ))}
    </div>
  );
}
