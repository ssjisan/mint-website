"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import HeroSectionGradiant from "../../Assets/HeroSectionGradiant";
import "./HeroSection.scss";

const SNOW_COUNT = 20;

type Snowflake = {
  x: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
};

export default function HeroSection() {
  /* ================= CREATE SNOW ONCE (NO EFFECT) ================= */
  const [snowflakes] = useState<Snowflake[]>(() =>
    Array.from({ length: SNOW_COUNT }).map(() => ({
      x: Math.random() * 100,
      size: Math.random() * 3 + 2,
      opacity: Math.random() * 0.75 + 0.2,
      duration: Math.random() * 12 + 12,
      delay: Math.random() * -20,
      drift: Math.random() * 80 - 40,
    })),
  );

  /* ================= ANIMATION VARIANTS ================= */

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="container hero-container">
      {/* ================= CONTENT ================= */}
      <motion.div
        className="hero-section-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="title-subtitle">
          <motion.h2 className="heading-h2" variants={item}>
            Internet built on{" "}
            <span className="extra-style-for-h2">25 years</span> of trust.
          </motion.h2>

          <motion.p className="body-one" variants={item}>
            Experience premium speed in your exclusive neighborhood (Gulshan,
            Banani, Baridhara, Wari)
          </motion.p>
        </div>
      </motion.div>

      {/* ================= GRADIENT ================= */}
      <HeroSectionGradiant />

      {/* ================= SNOW ================= */}
      <div className="snow-wrapper">
        {snowflakes.map((flake, i) => (
          <span
            key={i}
            className="snowflake"
            style={
              {
                left: `${flake.x}%`,
                width: `${flake.size}px`,
                height: `${flake.size}px`,
                opacity: flake.opacity,
                animationDuration: `${flake.duration}s`,
                animationDelay: `${flake.delay}s`,
                "--drift": `${flake.drift}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
