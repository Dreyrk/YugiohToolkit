import { FavoriteBtnProps } from "@/types";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";

export default function FavoriteBtn({
  size = 40,
  color,
  type,
  isFav,
  like,
}: FavoriteBtnProps) {
  return (
    <button onClick={like} type={type}>
      {isFav ? (
        <MdFavorite size={size} color={color} />
      ) : (
        <MdFavoriteBorder size={size} />
      )}
    </button>
  );
}
