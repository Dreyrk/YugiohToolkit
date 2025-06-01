//import { notFound } from "next/navigation";
import getSharableCollection from "@/actions/getSharableCollection";
import CollectionCardGrid from "@/components/CollectionCardGrid";

export default async function Page({ params }: { params: Promise<{ userId: string; collectionId: string }> }) {
  const { userId, collectionId } = await params;
  const { data, success, error } = await getSharableCollection(userId, collectionId);

  if (!success || !data || error) {
    // if (error?.includes("404")) {
    //   return notFound();
    // }
    return (
      <div>
        <p>{error || "Cette collection ne peut pas être récupérée"}</p>
      </div>
    );
  }

  return (
    <div>
      <CollectionCardGrid cards={data.cards} />
    </div>
  );
}
