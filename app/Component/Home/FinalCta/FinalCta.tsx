"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import axios from "../../../lib/axios";
import toast from "react-hot-toast";

import AbstractGrid from "../../Assets/AbstractGrid";
import Email from "../../Assets/Email";
import LightRayTypeSix from "../../Assets/LightRayTypeSix";
import Phone from "../../Assets/Phone";
import "./FinalCta.scss";

import { Package } from "@/app/lib/types/package";
import ConnectionModal from "../ConnectionModal/ConnectionModal";

/* ================= CTA CARD ================= */

function CtaCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="final-cta-body">
      <div className="cta-glow" />
      {children}
    </div>
  );
}

/* ================= ANIMATION VARIANTS ================= */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const, // ✅ FIXED
    },
  },
};

const extraContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.14,
    },
  },
};

/* ================= MAIN ================= */

export default function FinalCta() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);

  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const fetchPackages = async () => {
    try {
      const res = await axios.get("/packages");
      setPackages(res.data.packages);

      if (res.data.packages.length > 0) {
        setSelectedPackage(res.data.packages[0]);
      }
    } catch {
      toast.error("Failed to load packages");
    }
  };

  const openModal = () => {
    if (!packages.length) {
      fetchPackages().then(() => setModalOpen(true));
    } else {
      setModalOpen(true);
    }
  };

  return (
    <section ref={sectionRef} className="final-ctg-container container">
      <CtaCard>
        <div className="cta-gradient">
          <LightRayTypeSix />
        </div>

        <div className="cta-grid">
          <AbstractGrid />
        </div>

        {/* MAIN CONTENT */}
        <motion.div
          className="final-cta-content"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h2 variants={itemVariants} className="heading-h3">
            More than just speed. Mint is a lifestyle.
          </motion.h2>

          <motion.p variants={itemVariants} className="subtitle">
            Ready for internet as exceptional as your address?
          </motion.p>
        </motion.div>

        {/* BUTTON */}
        <motion.button
          className="button primary-fill-button"
          onClick={openModal}
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          Get Mint
        </motion.button>

        {/* REFERRAL */}
        <motion.div
          className="referal-link-section"
          variants={extraContainerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div variants={itemVariants} className="referral-divider">
            <span className="divider-line" />
            <p>or</p>
            <span className="divider-line" />
          </motion.div>

          <motion.p variants={itemVariants} className="subtitle">
            Want to refer Mint to someone?
          </motion.p>

          <motion.button
            variants={itemVariants}
            onClick={() => {
              navigator.clipboard.writeText("https://www.mint.com.bd/referral");
              toast.success("Referral link copied!");
            }}
            className="button primary-outline-button"
          >
            Copy Referral link
          </motion.button>
        </motion.div>

        {/* CONTACT */}
        <motion.div
          className="final-cta-contact-deck"
          variants={extraContainerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            variants={itemVariants}
            className="final-cta-contact-email"
          >
            <div className="final-cta-icon-body">
              <Email />
            </div>
            <p className="subtitle">info@mint.com.bd</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="final-cta-contact-email"
          >
            <div className="final-cta-icon-body">
              <Phone />
            </div>
            <p className="subtitle">09666773696</p>
          </motion.div>
        </motion.div>
      </CtaCard>

      {modalOpen && selectedPackage && (
        <ConnectionModal
          selectedPackage={selectedPackage}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
}
