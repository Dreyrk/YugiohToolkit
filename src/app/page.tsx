import { getSession } from "@/actions/auth/getSession";
import getCards from "../actions/getCards";
import { YugiCards } from "@/types";
import DeckClient from "@/components/deck/DeckClient";

export default async function Home() {
  const [mainCards, extraCards, sideCards] = await Promise.all([
    getCards("main") as Promise<YugiCards[]>,
    getCards("extra") as Promise<YugiCards[]>,
    getCards("side") as Promise<YugiCards[]>,
  ]);

  const session = await getSession();

  return <DeckClient user={session.user || null} mainCards={mainCards} extraCards={extraCards} sideCards={sideCards} />;
}
