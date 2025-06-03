import CardCollection from "@/components/CardCollection";
import { CardsSkeleton } from "@/components/cards/CardSkeleton";
import { Suspense } from "react";

export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-secondary">Card Collection Manager</h1>
      <Suspense fallback={<CardsSkeleton />}>
        <CardCollection userId={userId} />
      </Suspense>
    </div>
  );
}
