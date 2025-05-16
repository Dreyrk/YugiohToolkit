"use client";

import { YugiCards } from "@/types";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function AnimatedYugiCard({ card, style }: { card: YugiCards; style: string }) {
  const x = useMotionValue(240);
  const y = useMotionValue(200);

  const rotateX = useTransform(y, [0, 480], [40, -40]);
  const rotateY = useTransform(x, [0, 400], [-40, 40]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const resetPosition = () => {
    x.set(240);
    y.set(200);
  };

  return (
    <motion.div
      className={`mouseContainer ${style ? style : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}>
      <motion.div
        style={{
          height: 260,
          width: 180,
          rotateY,
          rotateX,
          perspective: 500,
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        transition={{ duration: 0.5 }}>
        <Image
          className="z-40"
          src={card.img ? card.img : "/assets/cardBack.jpg"}
          alt="card"
          width={180}
          height={260}
        />
      </motion.div>
    </motion.div>
  );
}
