"use client";

import Link from "next/link";
import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import { SessionUser } from "@/types";
import { IoLogIn } from "react-icons/io5";

export default function Navbar({ user }: { user: SessionUser | null }) {
  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center px-6 py-4">
        <Link className="grid place-content-center mb-2 sm:mb-0" href="/" replace={true}>
          <Image src="/assets/millenium-puzzle.png" alt="puzzle" width={80} height={80} />
        </Link>
        <h1 className="text-white text-5xl text-center font-semibold">Deck Builder</h1>
        <Link
          className="text-slate-100 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          href={user && user.id ? "/profile" : "/auth"}
          replace={true}>
          {user && user.id ? (
            <BiUserCircle size={30} />
          ) : (
            <>
              <IoLogIn size={30} />
            </>
          )}
        </Link>
      </nav>
    </header>
  );
}
