import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Pencil, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";

import getUserCollectionById from "@/actions/users/collection/getUserCollectionById";
import editCollection from "@/actions/users/collection/editUserCollection";

import { Button } from "@/components/ui/button";
import CollectionFilters from "@/components/CollectionFilters";
import CollectionForm from "@/components/CollectionForm";

interface PageProps {
  params: Promise<{ collectionId: string; userId: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { userId, collectionId } = await params;
  const search = await searchParams;
  const collection = await getUserCollectionById(collectionId, search);

  if (!collection) return notFound();

  const isEditMode = search.edit === "true";

  const handleEditCollection = async (formData: FormData) => {
    "use server";

    const name = formData.get("name")?.toString().trim() || "";
    const description = formData.get("description")?.toString().trim() || "";
    const isSharable = Boolean(formData.get("isSharable")) || false;

    if (!name) {
      toast.warn("Le nom de la collection est requis.");
      return;
    }

    const cardsData = formData.get("cardsData")?.toString();
    const cards = cardsData ? JSON.parse(cardsData) : collection.cards;

    const updated = { ...collection, cards, name, description, isSharable };

    await editCollection(updated);
    redirect(`/profile/${userId}/collections/${collection.id || collection}`);
  };

  return (
    <div className="space-y-8 container mx-auto px-4">
      <div className="flex items-center justify-between">
        <Link href={`/profile/${userId}/collections`}>
          <Button variant="ghost" className="flex items-center gap-1 text-secondary font-semibold">
            <ChevronRight strokeWidth={3} className="h-5 w-5 rotate-180" />
            Retour aux collections
          </Button>
        </Link>

        {!isEditMode && (
          <Link href={`/profile/${userId}/collections/${collection.id}?edit=true`}>
            <Button variant="outline" size="sm">
              <Pencil className="h-4 w-4 mr-2" />
              Modifier la collection
            </Button>
          </Link>
        )}
      </div>

      <CollectionFilters duplicate={true} />

      <CollectionForm
        collection={collection}
        isEditMode={isEditMode}
        userId={userId}
        handleEditCollection={handleEditCollection}
      />
    </div>
  );
}
