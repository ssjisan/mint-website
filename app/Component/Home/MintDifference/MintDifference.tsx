"use client";

import Image from "next/image";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

import AbstractGrid from "../../Assets/AbstractGrid";
import FourKStreaming from "../../Assets/FourKStreaming";
import LightRayTypeOne from "../../Assets/LightRayTypeOne";
import LightRayTypeTwo from "../../Assets/LightRayTypeTwo";
import LightRayTypeFour from "../../Assets/LightRayTypeFour";
import FadeOut from "../../Assets/FadeOut";
import PolkaDot from "../../Assets/PolkaDot";
import AlwaysConnected from "../../Assets/AlwaysConnected";

import "./MintDifference.scss";
import LightRayTypeFive from "../../Assets/LightRayTypeFive";
import LightRayTypeSix from "../../Assets/LightRayTypeSix";

/* ================= ANIMATION VARIANTS ================= */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9 },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9 },
  },
};

/* ================= CARD WITH HOVER GLOW ================= */

function ExperienceCard({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <motion.div
      className="difference-card"
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-80px" }}
    >
      {/* Hover Glow */}
      <motion.div
        className="difference-card-glow"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              240px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.12),
              transparent 65%
            )
          `,
        }}
      />

      {children}
    </motion.div>
  );
}

/* ================= MAIN COMPONENT ================= */

export default function MintDifference() {
  return (
    <motion.section
      className="mint-difference-container container"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-120px" }}
    >
      {/* TITLE */}
      <motion.h2 className="heading-h2" variants={titleVariants}>
        The mint Difference
      </motion.h2>

      <div className="row g-3">
        <div className="col-12 col-sm-12 col-md-7 col-lg-7">
          <ExperienceCard>
            {/* Absolute image layer */}
            <div className="card-image-layer">
              <Image
                src="/heritageOfTrust.png"
                alt=""
                width={280}
                height={280}
              />
            </div>

            {/* Graphics */}
            <div className="first-graphics">
              <LightRayTypeFive />
            </div>

            {/* Content */}
            <div className="difference-content">
              <h6 className="heading-h6">Heritage of Trust</h6>
              <p className="subtitle">
                Built on 25 years of established industry experience.
              </p>
            </div>
          </ExperienceCard>
        </div>
        <div className="col-12 col-sm-12 col-md-5 col-lg-5">
          <ExperienceCard>
            <div className="card-image-layer">
              <Image
                src="/trueExclusivity.png"
                alt=""
                width={280}
                height={280}
              />
            </div>

            {/* Graphics */}
            <div className="second-graphics">
              <LightRayTypeSix />
            </div>

            {/* Content */}
            <div className="difference-content">
              <h6 className="heading-h6">True Exclusivity</h6>
              <p className="subtitle">
                Active only in Dhaka’s premier neighborhoods to ensure undivided
                network quality.
              </p>
            </div>
          </ExperienceCard>
        </div>
        <div className="col-12 col-sm-12 col-md-5 col-lg-5">
          <ExperienceCard>
            <div className="card-image-layer">
              <Image
                src="/worldClassCore.png"
                alt=""
                width={280}
                height={280}
              />
            </div>

            {/* Graphics */}
            <div className="second-graphics">
              <LightRayTypeSix />
            </div>

            {/* Content */}
            <div className="difference-content">
              <h6 className="heading-h6">True Exclusivity</h6>
              <p className="subtitle">
                Active only in Dhaka’s premier neighborhoods to ensure undivided
                network quality.
              </p>
            </div>
          </ExperienceCard>
        </div>
        <div className="col-12 col-sm-12 col-md-7 col-lg-7">
          <ExperienceCard>
            <div className="card-image-layer">
              <Image
                src="/radicalSimplicity.png"
                alt=""
                width={280}
                height={280}
              />
            </div>

            <div className="first-graphics">
              <LightRayTypeFive />
            </div>

            {/* Content */}
            <div className="difference-content">
              <h6 className="heading-h6">Radical Simplicity</h6>
              <p className="subtitle">
                One powerful residential package. Just 100 Mbps. No confusion.
              </p>
            </div>
          </ExperienceCard>
        </div>
      </div>
    </motion.section>
  );
}
