import { redirect } from "next/navigation";
import { getSession } from "@/actions/auth/getSession";
import getCardsById from "@/actions/getCardById";
import getUserFavs from "@/actions/getUserFavs";
import AnimatedText from "@/components/AnimatedText";
import DetailsDisplay from "@/components/DetailsDisplay";
import AnimatedYugiCard from "@/components/cards/AnimatedYugiCard";
import { YugiCards } from "@/types";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const card = (await getCardsById(id)) as YugiCards;
  const session = await getSession();

  if (!session.user) {
    redirect("/auth");
  } else {
    const favs = await getUserFavs(session?.user.id);

    const isFav = favs !== null ? favs.some((el: YugiCards) => el.id === card.id) : false;

    return (
      <div className="grid grid-cols-8 gap-8 py-6 max-lg:flex max-lg:flex-col max-lg:gap-6">
        <AnimatedText style="col-span-full" text={card.name} />
        <AnimatedYugiCard style="col-start-2 max-lg:self-center" card={card} />
        <DetailsDisplay session={session} isFav={isFav} card={card} />
      </div>
    );
  }
}
