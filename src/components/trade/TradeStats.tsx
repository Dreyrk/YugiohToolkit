import { Library, Repeat, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TradeStatsCardsProps {
  activeProposalsCount: number;
  completedTradesCount: number;
  userProposalsCount: number;
}

export default function TradeStatsCards({
  activeProposalsCount,
  completedTradesCount,
  userProposalsCount,
}: TradeStatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Propositions Actives</CardTitle>
          <Library className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeProposalsCount}</div>
          <p className="text-xs text-muted-foreground">sur toute la plateforme</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Échanges Réussis</CardTitle>
          <Repeat className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedTradesCount}</div>
          <p className="text-xs text-muted-foreground">total d&apos;échanges complétés</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mes Propositions</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userProposalsCount}</div>
          <p className="text-xs text-muted-foreground">que vous avez créées</p>
        </CardContent>
      </Card>
    </div>
  );
}
