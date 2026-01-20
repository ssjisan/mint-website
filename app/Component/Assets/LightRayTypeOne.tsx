"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LightRayTypeOne() {
  return (
    <svg
      width="100%"
      height="666"
      viewBox="0 0 515 666"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.g
        style={{ transformOrigin: "center" }}
        animate={{
          opacity: [0.4, 0.9, 0.4],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        filter="url(#filter0_f_6332_33588)"
      >
        <path
          d="M413.514 582.538L82.6303 140.056L178.967 82.6303L431.958 570.453L413.514 582.538Z"
          fill="url(#paint0_linear_6332_33588)"
        />
      </motion.g>

      <defs>
        <filter
          id="filter0_f_6332_33588"
          x="-4.57764e-05"
          y="7.62939e-05"
          width="514.589"
          height="665.168"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="41.3151"
            result="effect1_foregroundBlur_6332_33588"
          />
        </filter>

        <linearGradient
          id="paint0_linear_6332_33588"
          x1="223.539"
          y1="376.443"
          x2="319.875"
          y2="319.018"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0F9978" />
          <stop offset="1" stopColor="#0F9978" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
