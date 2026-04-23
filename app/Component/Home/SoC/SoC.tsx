"use client";

import { useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";
import "./SoC.scss";

import LogManagment from "../../Assets/LogManagment";
import Shield from "../../Assets/Shield";
import Alert from "../../Assets/Alert";
import Investigation from "../../Assets/Investigation";
import Dashboard from "../../Assets/Dashboard";
import CustomeSupportModal from "../../CustomeSupportModal/CustomeSupportModal";

/* ================= DATA ================= */

const socPoints = [
  { icon: Shield, title: "Real-time threat detection & proactive hunting" },
  { icon: Alert, title: "Accurate alert triage and prioritization" },
  { icon: Investigation, title: "Fast incident investigation & response" },
  { icon: LogManagment, title: "Centralized log management & correlation" },
  {
    icon: Dashboard,
    title: "Compliance-aligned reporting & executive dashboards",
  },
];

/* ================= ANIMATION ================= */

const ease = [0.25, 0.1, 0.25, 1] as const;

/* Left header + paragraph */
const leftContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
};

/* Points */
const pointsContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.35,
      staggerChildren: 0.1,
    },
  },
};

const pointItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
};

/* Button */
const buttonVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.9,
      ease,
    },
  },
};

/* Right side */
const rightGraphic: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      delay: 0.2,
      ease,
    },
  },
};

const centerImage: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      delay: 0.45,
      ease,
    },
  },
};

/* ================= COMPONENT ================= */

export default function SoC() {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-20% 0px",
  });

  return (
    <section ref={sectionRef} className="container soc-container">
      <div className="row g-4 align-items-center">
        {/* LEFT SIDE */}
        <div className="col-12 col-md-6">
          <div className="soc-content">
            <motion.div
              className="soc-content-header"
              variants={leftContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.div variants={fadeUp} className="soc-chip">
                <p>SOC as Service (SOCaaS)</p>
              </motion.div>

              <motion.h3 variants={fadeUp} className="heading-h3">
                24×7×365 Managed Security Operations
              </motion.h3>
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="body-one"
            >
              Powered by advanced XDR and SIEM platforms including Stellar Cyber
              and Microsoft Sentinel, our SOC delivers continuous,
              enterprise-grade monitoring and rapid incident response.
            </motion.p>

            {/* POINTS */}
            <motion.div
              className="soc-points-deck"
              variants={pointsContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {socPoints.map((item, index) => {
                const IconComponent = item.icon;

                return (
                  <motion.div
                    className="soc-points-list"
                    key={index}
                    variants={pointItem}
                  >
                    <IconComponent />
                    <p>{item.title}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* BUTTON */}
            <motion.div
              className="button-deck-soc"
              variants={buttonVariant}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <button
                className="button primary-fill-button"
                onClick={() => setOpen(true)}
              >
                Request for Demo
              </button>
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-12 col-md-6">
          <motion.div
            className="soc-graphic-content position-relative"
            variants={rightGraphic}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Image
              src="/soc-vector.png"
              alt="Background Vector"
              fill
              className="vector-svg"
            />

            <motion.div variants={centerImage}>
              <Image
                src="/soc.png"
                alt="SOC Graphic"
                width={420}
                height={420}
                className="soc-center-svg img-fluid"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {open && (
        <CustomeSupportModal
          onClose={() => setOpen(false)}
          defaultServiceName="SOC as Service (SOCaaS)"
        />
      )}
    </section>
  );
}
