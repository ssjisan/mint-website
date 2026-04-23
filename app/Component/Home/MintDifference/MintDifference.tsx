"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import "./MintDifference.scss";

/* ================= CARD COMPONENT ================= */

function ExperienceCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={cardVariants} className="difference-card">
      {children}
    </motion.div>
  );
}

/* ================= ANIMATION ================= */

const ease = [0.25, 0.1, 0.25, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2, // matches stagger start
    },
  },
};

const titleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

/* ================= MAIN COMPONENT ================= */

export default function MintDifference() {
  return (
    <section className="mint-difference-container container">
      {/* TITLE */}
      <motion.h2
        className="heading-h2 mint-difference-title"
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20% 0px" }}
      >
        Mint,
        <br />
        The Difference
      </motion.h2>

      {/* CARDS */}
      <motion.div
        className="row g-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20% 0px" }}
      >
        <div className="col-12 col-sm-12 col-md-7 col-lg-7">
          <ExperienceCard>
            <div className="card-image-layer">
              <Image src="/heritageOfTrust.png" alt="" width={72} height={72} />
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
              <Image src="/trueExclusivity.png" alt="" width={72} height={72} />
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
              <Image
                src="/radicalSimplicity.png"
                alt=""
                width={72}
                height={72}
              />
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
              <Image src="/worldClassCore.png" alt="" width={72} height={72} />
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
      </motion.div>
    </section>
  );
}
