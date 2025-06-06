import { redirect } from "next/navigation";
import { getSession } from "@/actions/auth/getSession";
import logout from "@/actions/auth/logout";
import { profileSections } from "@/constants";
import { Button } from "@/components/ui/button";
import SectionMenu from "@/components/SectionMenu";

export default async function Page() {
  const session = await getSession();

  if (!session.user) {
    return redirect("/auth");
  } else {
    return (
      <div className="mx-auto p-8 flex flex-col gap-10 items-center">
        <h1 className="text-slate-200 text-3xl text-center">
          Bienvenue <span className="font-bold text-white">{session?.user.pseudo}</span> !
        </h1>
        <p className="text-white font-light text-sm">{session?.user.email}</p>
        {profileSections.map((section) => (
          <SectionMenu key={section.title} section={section} user={session.user} />
        ))}
        <form action={logout}>
          <Button variant="destructive" type="submit">
            Se déconnecter
          </Button>
        </form>
      </div>
    );
  }
}
