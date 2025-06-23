"use client";

import Link from "next/link";
import Image from "next/image";
import { SessionUser } from "@/types";
import UserDropdown from "./UserDropdown";

export default function Navbar({ user }: { user: SessionUser | null }) {
  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center px-6 py-4">
        <Link className="grid place-content-center" href="/" replace={true}>
          <Image src="/assets/millenium-puzzle.png" alt="puzzle" width={80} height={80} />
        </Link>
        <h1 className="text-white text-5xl text-center font-semibold">Deck Builder</h1>
        <UserDropdown user={user} />
      </nav>
    </header>
  );
}
