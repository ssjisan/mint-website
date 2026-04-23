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

import "./MintExperience.scss";

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
      className="experience-card"
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* Hover Glow */}
      <motion.div
        className="card-glow"
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

export default function MintExperience() {
  return (
    <motion.section
      className="mint-experience-container container"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
    >
      {/* TITLE */}
      <motion.h2 className="heading-h2" variants={titleVariants}>
        The mint Experience
      </motion.h2>

      <div className="row g-3">
        {/* CARD 1 */}
        <div className="col-12 col-md-6 col-lg-4">
          <ExperienceCard>
            <div className="experience-graphics">
              <AbstractGrid />
              <LightRayTypeOne />
              <FourKStreaming />
            </div>

            <div className="experience-content">
              <h6 className="heading-h6">Instant 4K Streaming</h6>
              <p className="subtitle">
                Stream cinematic content on your Smart TV instantly. Zero
                buffering, pure entertainment.
              </p>
            </div>
          </ExperienceCard>
        </div>

        {/* CARD 2 */}
        <div className="col-12 col-md-6 col-lg-4">
          <ExperienceCard>
            <div className="experience-graphics-two">
              <AbstractGrid />
              <LightRayTypeTwo />
              <FadeOut />
              <Image
                src="/Sub Container.png"
                alt="Video call"
                fill
                className="experience-image"
                priority
              />
            </div>

            <div className="experience-content">
              <h6 className="heading-h6">Flawless Video Calls</h6>
              <p className="subtitle">
                Conduct critical work or school calls with total stability. No
                dropouts, ever.
              </p>
            </div>
          </ExperienceCard>
        </div>

        {/* CARD 3 */}
        <div className="col-12 col-md-6 col-lg-4">
          <ExperienceCard>
            <div className="experience-graphics-three">
              <PolkaDot />
              <LightRayTypeFour />
              <AlwaysConnected />
            </div>

            <div className="experience-content">
              <h6 className="heading-h6">Always Connected</h6>
              <p className="subtitle">
                Browsing, social media, and smart home devices running
                simultaneously without slowing down.
              </p>
            </div>
          </ExperienceCard>
        </div>
      </div>
    </motion.section>
  );
}
