import { YugiCards } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function StaticYugiCard({ card }: { card: YugiCards }) {
  return (
    <Link href={`/cards/${card.id}`} replace={true} className="relative lg:hover:scale-125">
      <Image
        loading="lazy"
        className="z-40"
        src={card.img ? card.img : "/assets/cardBack.jpg"}
        alt="card"
        width={180}
        height={260}
      />
    </Link>
  );
}
