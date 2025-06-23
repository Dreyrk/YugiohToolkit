import Image from "next/image";
import { TradeProposalCardProps, YugiCards } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import YugiCard from "../cards/YugiCard";

export default function TradeProposalCard({ proposal }: TradeProposalCardProps) {
  return (
    <Card className="flex flex-col justify-between hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="aspect-w-1 aspect-h-1 mb-4 mx-auto">
          <YugiCard card={proposal.card as unknown as YugiCards} />
        </div>
        <CardTitle className="text-lg">{proposal.card.name}</CardTitle>
        <CardDescription>
          Proposé par <span className="text-blue-500">@{proposal.proposer.pseudo}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">État</span>
          <Badge variant="secondary">{proposal.cardDetails.condition}</Badge>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Langue</span>
          <Badge variant="secondary">{proposal.cardDetails.language}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-blue-500">Ici, le bouton pour faire une offre.</p>
        {/* <MakeOfferDialog proposalId={proposal.id} /> */}
      </CardFooter>
    </Card>
  );
}
