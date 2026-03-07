"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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

/* ================= CARD COMPONENT ================= */

function ExperienceCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="difference-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-80px" }} // animate only once
    >
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
      viewport={{ once: false, margin: "-120px" }} // animate only once
    >
      {/* TITLE */}
      <motion.h2 className="heading-h2" variants={titleVariants}>
        Mint,<br />The Difference
      </motion.h2>

      <div className="row g-5">
        <div className="col-12 col-sm-12 col-md-7 col-lg-7">
          <ExperienceCard>
            <div className="card-image-layer">
              <Image
                src="/heritageOfTrust.png"
                alt=""
                width={280}
                height={280}
              />
            </div>
            <div className="first-graphics">
              <LightRayTypeFive />
            </div>
            <div className="difference-content">
              <h5 className="heading-h5">Heritage of Trust</h5>
              <p className="body-one">
                Built on 25 years of established industry experience.
              </p>
            </div>
          </ExperienceCard>
        </div>

        <div className="col-12 col-sm-12 col-md-5 col-lg-5">
          <ExperienceCard>
            <div className="card-image-layer">
              <Image src="/trueExclusivity.png" alt="" width={280} height={280} />
            </div>
            <div className="second-graphics">
              <LightRayTypeSix />
            </div>
            <div className="difference-content">
              <h5 className="heading-h5">True Exclusivity</h5>
              <p className="body-one">
                Active only in Dhaka’s premier neighborhoods to ensure undivided
                network quality.
              </p>
            </div>
          </ExperienceCard>
        </div>

        <div className="col-12 col-sm-12 col-md-5 col-lg-5">
          <ExperienceCard>
            <div className="card-image-layer">
              <Image src="/radicalSimplicity.png" alt="" width={280} height={280} />
            </div>
            <div className="first-graphics">
              <LightRayTypeFive />
            </div>
            <div className="difference-content">
              <h5 className="heading-h5">Radical Simplicity</h5>
              <p className="body-one">
                One powerful residential package. Just 100 Mbps. No confusion.
              </p>
            </div>
          </ExperienceCard>
        </div>

        <div className="col-12 col-sm-12 col-md-7 col-lg-7">
          <ExperienceCard>
            <div className="card-image-layer">
              <Image src="/worldClassCore.png" alt="" width={280} height={280} />
            </div>
            <div className="second-graphics">
              <LightRayTypeSix />
            </div>
            <div className="difference-content">
              <h5 className="heading-h5">Zero-Congestion Design</h5>
              <p className="body-one">
                Peak hours don&apos;t exist here. Enjoy uninterrupted, dedicated
                bandwidth that never fluctuates, no matter who else is online.
              </p>
            </div>
          </ExperienceCard>
        </div>
      </div>
    </motion.section>
  );
}