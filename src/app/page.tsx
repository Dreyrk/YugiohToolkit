import { getSession } from "@/actions/auth/getSession";
import DeckClient from "@/components/deck/DeckClient";

export default async function Home() {
  const session = await getSession();

  return <DeckClient user={session.user || null} />;
}
