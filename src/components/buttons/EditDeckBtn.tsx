"use client";

import { FaEdit } from "react-icons/fa";

export default function EditDeckBtn({ type = "button" }: { type: "button" | "submit" | "reset" }) {
  return (
    <button className="hover:scale-110 p-2 rounded-sm backdrop-blur" type={type}>
      <FaEdit size={40} />
    </button>
  );
}
