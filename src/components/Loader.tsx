"use client";

export default function Loader({ size = 64, absolute = true }: { size?: number; absolute?: boolean }) {
  return (
    <div
      style={{ height: `${size}px`, width: `${size}px` }}
      className={`${
        absolute && "absolute top-1/2 left-1/2"
      } border-8 rounded-full place-self-center border-white border-light-black border-t-purple-600 animate-spin`}
    />
  );
}
