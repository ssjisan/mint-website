"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";
import "./StacklinkBacked.scss";

/* ================= VARIANTS ================= */

const mapVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const contentContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.12,
    },
  },
};

const contentItem: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

/* ================= COMPONENT ================= */

export default function StacklinkBacked() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-20% 0px",
  });

  return (
    <section ref={sectionRef} className="container starlink-backed-container">
      {/* CONTENT */}
      <motion.div
        className="starlink-backed-content"
        variants={contentContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h4 variants={contentItem} className="heading-h3">
          Starlink-Backed Resilience
        </motion.h4>

        <motion.p variants={contentItem} className="body-one">
          When terrestrial disruptions occur, Mint provides a true last line of
          defense.
        </motion.p>
      </motion.div>

      {/* MAP (ANIMATES FIRST) */}
      <motion.div
        className="map-svg-part"
        variants={mapVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <Image
          src="/map.png"
          alt="World Map"
          fill
          className="map-img"
          priority
        />

        <div className="map-radar">
          <Image src="/radar.png" alt="Radar" fill className="radar-img" />
        </div>
      </motion.div>
    </section>
  );
}
