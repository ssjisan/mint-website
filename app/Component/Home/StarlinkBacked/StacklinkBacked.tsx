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
      <motion.div
        className="starlink-backed-content"
        variants={fadeUpVariants}
      >
        <h4 className="starlink-backed-h3">
          Always Connected{" "}
          <span
            className="animated-globe"
            dangerouslySetInnerHTML={{
              __html: `
              <picture>
                <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f30f/512.webp" type="image/webp">
                <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f30f/512.gif" alt="globe" width="28" height="28" style="display:inline-block; vertical-align:middle;" />
              </picture>
              `,
            }}
          />
          <br />
          Even When Others Go Down
        </h4>

        <p className="starlink-backed-body">
          All Mint internet packages are supported by Starlink-backed
          connectivity, ensuring strong network stability, improved uptime, and
          consistent performance across our network.
        </p>
      </motion.div>
    </motion.section>
  );
}