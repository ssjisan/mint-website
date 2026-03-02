"use client";

import { motion, Variants } from "framer-motion";
import HeroSectionGradiant from "../../Assets/HeroSectionGradiant";
import "./HeroSection.scss";
import InternetUnderline from "../../Assets/InternetUnderline";

export default function HeroSection() {
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
            <span className="internet-wrapper">
              <span className="internet-text">Internet</span>
              <InternetUnderline />
            </span> built on{" "}
            <span className="extra-style-for-h2">25 years</span> of trust.
          </motion.h2>

          <motion.p className="body-one hero-subtitle" variants={item}>
            Experience premium speed in your exclusive neighborhood (Gulshan,
            Banani, Baridhara, Wari)
          </motion.p>
        </div>
      </motion.div>

      {/* ================= GRADIENT ================= */}
      <HeroSectionGradiant />
    </div>
  );
}