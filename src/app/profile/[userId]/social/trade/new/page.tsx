"use server";

import { CreateProposalForm } from "@/components/trade/CreateProposalForm";

export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  return (
    <div className="min-h-screen p-4">
      <CreateProposalForm userId={userId} />
    </div>
  );
}
