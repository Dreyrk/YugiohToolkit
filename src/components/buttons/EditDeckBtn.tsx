"use client";

import { useState } from "react";
import { FaEdit } from "react-icons/fa";

export default function EditDeckBtn({
  type = "button",
}: {
  type: "button" | "submit" | "reset";
}) {
  const [edit, setEdit] = useState("");

  const editDeck = async () => {};

  return (
    <button
      className="hover:scale-110 p-2 rounded-sm backdrop-blur"
      type={type}>
      <FaEdit size={40} />
    </button>
  );
}
