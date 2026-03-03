"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MapRader from "../../Assets/MapRader";
import "./StacklinkBacked.scss";

/* ===== Animation Variants ===== */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.35,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9 }
  },
};

export default function StacklinkBacked() {
  return (
    <motion.section
      className="container starlink-backed-container"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-120px" }}
    >
      <motion.div
        className="starlink-backed-content"
        variants={fadeUpVariants}
      >
        <h4 className="starlink-backed-h3">
          Starlink-Backed Resilience
        </h4>

        <p className="starlink-backed-body">
          When terrestrial disruptions occur, Mint provides a true last line of defense.
        </p>
      </motion.div>
      {/* MAP PART (Reveals First) */}
      <motion.div className="map-svg-part" variants={fadeUpVariants}>
        <Image
          src="/map.svg"
          alt="World Map"
          fill
          className="map-img"
          priority
        />

        <div className="map-radar">
          <MapRader />
        </div>
      </motion.div>

      {/* CONTENT (Reveals Second) */}
    </motion.section>
  );
}