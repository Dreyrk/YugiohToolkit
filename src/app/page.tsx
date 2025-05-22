import { getSession } from "@/actions/auth/getSession";
import getCards from "../actions/getCards";
import DeckClient from "@/components/deck/DeckClient";

export default async function Home() {
  const [mainCards, extraCards, sideCards] = await Promise.all([getCards("main"), getCards("extra"), getCards("side")]);

  const session = await getSession();

  console.log(mainCards, extraCards);

  return <DeckClient user={session.user || null} mainCards={mainCards} extraCards={extraCards} sideCards={sideCards} />;
}
