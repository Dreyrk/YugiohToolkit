"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { AnimatedTextProps } from "@/types";

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
  }),
};

const child = {
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    x: -20,
    y: 10,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

export default function AnimatedText({ text, style }: AnimatedTextProps) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
  });

  const letters = Array.from(text);

  return (
    <motion.div
      ref={ref}
      className={`flex justify-center text-white items-center text-3xl my-12 w-full font-bold ${
        style && style
      }`}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}>
      {letters.map((letter, i) => (
        <motion.span variants={child} key={i}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
