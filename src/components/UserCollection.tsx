import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { ManageButtonsProps, UserCollectionProps } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import ShareButton from "./ui/share-btn";

export default function UserCollection({
  collection,
  pathname,
  handleDeleteCollection,
  isCurrentUser,
  userId,
}: UserCollectionProps) {
  return (
    <Card key={collection.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{collection.name}</CardTitle>
            <CardDescription>
              {collection.cards.length} carte{collection.cards.length !== 1 ? "s" : ""}
            </CardDescription>
          </div>
          <ManageButtons
            pathname={pathname}
            userId={userId}
            isCurrentUser={isCurrentUser}
            collection={collection}
            handleDeleteCollection={handleDeleteCollection}
          />
        </div>
      </CardHeader>
      <CardContent>
        {collection.description && <p className="text-sm text-muted-foreground mb-2">{collection.description}</p>}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {collection.cards.slice(0, 5).map((card, i) => (
            <div key={`${card.id}-${i}`} className="w-20 h-28 flex-shrink-0 relative rounded overflow-hidden">
              <Image src={card.img || "/assets/cardBack.jpg"} alt={card.name} fill className="object-cover" />
            </div>
          ))}
          {collection.cards.length > 5 && (
            <div className="w-20 h-28 flex-shrink-0 bg-muted flex items-center justify-center rounded">
              <span className="text-sm font-medium">+{collection.cards.length - 5}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link href={`${pathname}/${collection.id || collection._id}`}>
          <Button variant="outline" className="w-full">
            Voir Collection
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

function ManageButtons({ pathname, collection, handleDeleteCollection, userId, isCurrentUser }: ManageButtonsProps) {
  return (
    <div className="flex gap-1">
      <ShareButton url={`/shared/${userId}/collections/${collection.id || collection._id}`} size="sm" text="Partager" />
      {isCurrentUser && (
        <Link href={`${pathname}/${collection.id}?edit=true`}>
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Modifier</span>
          </Button>
        </Link>
      )}
      {isCurrentUser && handleDeleteCollection && (
        <form action={handleDeleteCollection}>
          <input id="collectionId" name="collectionId" type="hidden" value={collection.id} />
          <Button variant="ghost" size="icon" type="submit">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Supprimer</span>
          </Button>
        </form>
      )}
    </div>
  );
}
