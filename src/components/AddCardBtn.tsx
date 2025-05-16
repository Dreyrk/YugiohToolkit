import { AddCardBtnProps } from "@/types";
import { BsFillPlusCircleFill } from "react-icons/bs";

export default function AddCardBtn({ setIsOpen, isOpen }: AddCardBtnProps) {
  return (
    <div className="h-[260px] w-[180px] grid place-content-center">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-slate-300">
        <BsFillPlusCircleFill size={60} />
      </button>
    </div>
  );
}
