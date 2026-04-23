"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import "./HeroSection.scss";

/* ================= ANIMATION ================= */

const ease = [0.25, 0.1, 0.25, 1] as const;

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const title: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease,
    },
  },
};

const subtitle: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease,
    },
  },
};

/* ================= COMPONENT ================= */

export default function HeroSection() {
  return (
    <section className="hero-container">
      {/* BACKGROUND */}
      <div className="hero-gradient-wrapper" aria-hidden="true">
        <Image src="/HeroSection/bg.jpg" alt="" fill priority />
      </div>

      {/* CONTENT */}
      <div className="hero-section-content">
        <motion.div
          className="title-subtitle"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <motion.h2 className="heading-h1 hero-title" variants={title}>
            <span className="internet-wrapper">
              <span className="internet-text">Internet</span>

              <span className="underline-wrapper">
                <Image
                  src="/UnderlineDraw.svg"
                  alt="underline"
                  width={240}
                  height={40}
                  priority
                />
              </span>
            </span>{" "}
            built on <span className="extra-style-for-h2">25 years</span> of
            trust.
          </motion.h2>

          <motion.p className="body hero-subtitle" variants={subtitle}>
            Experience premium speed in your exclusive neighborhood (Gulshan,
            Banani, Baridhara, Wari)
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
