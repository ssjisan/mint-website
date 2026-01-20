"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FadeOut() {
  return (
    <motion.svg
      width="100%"
      height="111"
      viewBox="0 0 424 111"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0.4 }}
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <rect width="424" height="111" fill="url(#paint0_linear_6344_33935)" />
      <defs>
        <linearGradient
          id="paint0_linear_6344_33935"
          x1="212"
          y1="0"
          x2="212"
          y2="111"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#010907" stopOpacity="0.5" />
          <stop offset="1" stopColor="#010907" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}
