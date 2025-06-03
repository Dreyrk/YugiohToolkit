import getAllSharedCollections from "@/actions/users/collection/getAllSharedCollections";
import getUserPseudo from "@/actions/users/getUserPseudo";
import UserCollection from "@/components/UserCollection";

export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const userPseudo = await getUserPseudo(userId);
  const collections = await getAllSharedCollections(userId);

  return (
    <div>
      <h1 className="text-secondary text-3xl font-semibold my-4">
        Collections partagées de <span className="text-yellow-500">{userPseudo}</span>
      </h1>
      <div className="grid gap-4">
        {collections.map((collection, i) => (
          <UserCollection
            key={`${collection._id.toString()}-${i}`}
            collection={collection}
            pathname={`/shared/${userId}/collections`}
            isCurrentUser={false}
          />
        ))}
      </div>
    </div>
  );
}
