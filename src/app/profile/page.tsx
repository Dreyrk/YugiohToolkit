import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/actions/auth/getSession";
import logout from "@/actions/auth/logout";

export default async function Page() {
  const session = await getSession();

  if (!session.user) {
    return redirect("/auth");
  } else {
    return (
      <div className="max-w-sm mx-auto p-8 flex flex-col gap-10 items-center">
        <h1 className="text-slate-200 text-3xl text-center">
          Bienvenue <span className="font-bold text-white">{session?.user.pseudo}</span> !
        </h1>
        <p className="text-white font-light text-sm">{session?.user.email}</p>
        <div className="flex flex-wrap justify-center items-center gap-6">
          <Link
            className="text-lg font-semibold py-2 px-4 text-center bg-neutral-800 rounded-lg text-slate-200 shadow-sm shadow-neutral-600 hover:scale-95"
            href={`/profile/${session?.user.id}/collections`}>
            Collections
          </Link>
          <Link
            className="text-lg font-semibold py-2 px-4 text-center bg-neutral-800 rounded-lg text-slate-200 shadow-sm shadow-neutral-600 hover:scale-95"
            href={`/profile/${session?.user.id}/decks`}>
            Mes Decks
          </Link>
          <Link
            className="text-lg font-semibold py-2 px-4 text-center bg-neutral-800 rounded-lg text-slate-200 shadow-sm shadow-neutral-600 hover:scale-95"
            href={`/profile/${session?.user.id}/cards/new`}>
            Compléter la database
          </Link>
          <Link
            className="text-lg font-semibold py-2 px-4 text-center bg-neutral-800 rounded-lg text-slate-200 shadow-sm shadow-neutral-600 hover:scale-95"
            href={`/profile/${session?.user.id}/settings`}>
            Paramètres
          </Link>
        </div>
        <form action={logout}>
          <button
            className="text-white font-semibold bg-red-600 p-3 rounded-xl hover:scale-95 hover:text-slate-200"
            type="submit">
            Se déconnecter
          </button>
        </form>
      </div>
    );
  }
}
