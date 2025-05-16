"use client";

import { useState } from "react";
import FavoriteBtn from "@/components/buttons/FavoriteBtn";
import { DetailsDisplayProps } from "@/types";
import { toast } from "react-toastify";

export default function DetailsDisplay({
  session,
  card,
  isFav,
}: DetailsDisplayProps) {
  const [liked, setLiked] = useState(isFav);
  const like = async () => {
    if (session?.user.id) {
      const body = JSON.stringify({ card });
      const res = await fetch(`/api/user/${session?.user.id}/favs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      if (res.ok) {
        const { message, liked } = await res.json();
        setLiked(liked);
        toast.success(message);
      } else {
        toast.error("Something goes wrong...");
      }
    }
  };

  return (
    <ul className="col-start-5 col-span-3 text-slate-200 bg-neutral-800 p-6 rounded-lg flex flex-wrap justify-evenly max-lg:gap-y-6">
      <h2 className="text-2xl text-center basis-full underline h-12">
        Details
      </h2>
      {card.atk && (
        <li className="details-item">
          ATK : <span className="font-semibold text-xl">{card.atk}</span>
        </li>
      )}
      {card.def && (
        <li className="details-item">
          DEF : <span className="font-semibold text-xl">{card.def}</span>
        </li>
      )}
      {card.level && (
        <li className="details-item">
          Level : <span className="font-semibold text-xl">{card.level}</span>
        </li>
      )}
      {card.attribute && (
        <li className="details-item">
          Attribute :
          <span className="font-semibold text-xl mx-1">{card.attribute}</span>
        </li>
      )}
      <li className="basis-full p-2 overflow-hidden">
        [
        <span className="font-semibold mx-1">
          {card.race} / {card.type}
        </span>
        ]
        <p className="my-1 leading-tight overflow-auto max-h-40 max-w-full">
          {card.desc}
        </p>
      </li>
      <li className="details-item">
        Price :<span className="font-semibold text-xl mx-1">${card.price}</span>
      </li>
      <FavoriteBtn like={like} isFav={liked} type="button" color={"#ffee32"} />
    </ul>
  );
}
