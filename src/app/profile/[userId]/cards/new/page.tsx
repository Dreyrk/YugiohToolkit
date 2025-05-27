import { getSession } from "@/actions/auth/getSession";
import CreateCardForm from "@/components/cards/CreateCardForm";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  if (!session.user) {
    redirect("/profile");
  } else {
    return <CreateCardForm user={session.user} />;
  }
}
