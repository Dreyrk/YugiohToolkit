"use client";

import { FaTrash } from "react-icons/fa";

export default function DeleteDeckBtn({
  type = "button",
}: {
  type: "button" | "submit" | "reset";
}) {
  return (
    <button
      className="hover:scale-110 p-2 rounded-sm backdrop-blur"
      type={type}>
      <FaTrash size={30} color="#d00000" />
    </button>
  );
}
