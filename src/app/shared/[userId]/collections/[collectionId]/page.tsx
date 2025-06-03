import { notFound } from "next/navigation";
import getSharableCollection from "@/actions/users/collection/getSharableCollection";
import CollectionCardGrid from "@/components/CollectionCardGrid";

export default async function Page({ params }: { params: Promise<{ userId: string; collectionId: string }> }) {
  const { userId, collectionId } = await params;
  const { data, success, error } = await getSharableCollection(userId, collectionId);

  if (!success || !data || error) {
    if (error?.includes("404")) {
      return notFound();
    }
    return (
      <div>
        <p>{error || "Cette collection ne peut pas être récupérée"}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="mx-auto text-4xl text-secondary font-semibold py-6">{data.name}</h1>
      {data.description && <p className="text-secondary my-4">{data.description}</p>}
      <div className="my-4">
        <CollectionCardGrid cards={data.cards} />
      </div>
    </div>
  );
}
