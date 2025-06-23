import Link from "next/link";
import { Suspense } from "react";
import { PlusCircle } from "lucide-react";
import { getActiveTradeProposals } from "@/actions/trade/getActiveProposal";
import { getTradeStats } from "@/actions/trade/getTradeStats";
import TradeSearch from "@/components/trade/TradeSearch";
import TradeProposalList from "@/components/trade/TradeProposalList";
import TradeStatsCards from "@/components/trade/TradeStats";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";

// Signature de page simplifiée et correcte
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ userId: string }>;
  searchParams?: Promise<{ search?: string }>;
}) {
  const { userId } = await params;
  const search = await searchParams;
  const searchTerm = search?.search || "";

  const [proposals, stats] = await Promise.all([getActiveTradeProposals(searchTerm), getTradeStats(userId)]);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 text-slate-50 mt-2">
          <div>
            <h1 className="text-4xl font-bold mb-2">Échanges de cartes</h1>
            <p className="italic text-slate-200">Trouvez une carte à échanger ou proposez les vôtres.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href={`/profile/${userId}/social/trade/new`} passHref>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Créer une proposition
              </Button>
            </Link>
          </div>
        </div>

        <TradeStatsCards
          activeProposalsCount={stats.activeProposalsCount}
          completedTradesCount={stats.completedTradesCount}
          userProposalsCount={stats.userProposalsCount}
        />

        <TradeSearch placeholder="Rechercher une carte par nom..." />

        <Suspense fallback={<Loader />}>
          <TradeProposalList proposals={proposals} />
        </Suspense>
      </div>
    </div>
  );
}
