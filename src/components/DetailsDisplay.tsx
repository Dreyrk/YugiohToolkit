"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { DetailsDisplayProps } from "@/types";
import FavoriteBtn from "@/components/buttons/FavoriteBtn";
import addCardToFav from "@/actions/users/addCardToFav";
import removeFavCard from "@/actions/users/removeFavCard";

export default function DetailsDisplay({ card, isFav }: DetailsDisplayProps) {
  const [liked, setLiked] = useState(isFav || false);
  const like = async () => {
    if (!liked) {
      const { success, error } = await addCardToFav(card);

      if (error) {
        toast.error(error);
      }
      setLiked(success);
    } else {
      const { error } = await removeFavCard(card);

      if (error) {
        toast.error(error);
      }
      setLiked(false);
    }
  };

  return (
    <ul className="col-start-5 col-span-3 text-slate-200 bg-neutral-800 p-6 rounded-lg flex flex-wrap justify-evenly max-lg:gap-y-6">
      <h2 className="text-2xl text-center basis-full underline h-12">Details</h2>
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
          Attribute :<span className="font-semibold text-xl mx-1">{card.attribute}</span>
        </li>
      )}
      <li className="basis-full p-2 overflow-hidden">
        [
        <span className="font-semibold mx-1">
          {card.race} / {card.type}
        </span>
        ]<p className="my-1 leading-tight overflow-auto max-h-40 max-w-full">{card.desc}</p>
      </li>
      <li className="details-item">
        Price :<span className="font-semibold text-xl mx-1">${card.price}</span>
      </li>
      <FavoriteBtn like={like} isFav={liked} type="button" color={"#ffee32"} />
    </ul>
  );
}
