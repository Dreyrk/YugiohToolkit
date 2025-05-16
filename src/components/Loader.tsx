"use client";

export default function Loader({ size = 64 }: { size?: number }) {
  return (
    <div
      style={{ height: `${size}px`, width: `${size}px` }}
      className="absolute top-1/2 left-1/2 border-8 rounded-full place-self-center border-white border-light-black border-t-purple-600 animate-spin"
    />
  );
}
