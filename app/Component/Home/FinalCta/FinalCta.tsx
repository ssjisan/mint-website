"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import axios from "../../../lib/axios";

import AbstractGrid from "../../Assets/AbstractGrid";
import Email from "../../Assets/Email";
import LightRayTypeSix from "../../Assets/LightRayTypeSix";
import Phone from "../../Assets/Phone";
import "./FinalCta.scss";
import toast from "react-hot-toast";
import { useState } from "react";
import { Package } from "@/app/lib/types/package"; // same Package type
import ConnectionModal from "../ConnectionModal/ConnectionModal";

/* ================= ANIMATION VARIANTS ================= */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9 },
  },
};

/* ================= CTA CARD WITH HOVER GLOW ================= */

function CtaCard({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <motion.div
      className="final-cta-body"
      variants={contentVariants}
      onMouseMove={handleMouseMove}
    >
      {/* Hover Glow */}
      <motion.div
        className="cta-glow"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              280px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.14),
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

export default function FinalCta() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);

  // Fetch all packages once (optional)
  const fetchPackages = async () => {
    try {
      const res = await axios.get("/packages");
      setPackages(res.data.packages);
      // Optionally select the first package by default
      if (res.data.packages.length > 0)
        setSelectedPackage(res.data.packages[0]);
    } catch (err) {
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
    <motion.section
      className="final-ctg-container container"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-120px" }}
    >
      <CtaCard>
        {/* Gradient */}
        <div className="cta-gradient">
          <LightRayTypeSix />
        </div>

        {/* Grid */}
        <div className="cta-grid">
          <AbstractGrid />
        </div>

        {/* Content */}
        <div className="final-cta-content">
          <h2 className="heading-h3">
            More than just speed. Mint is a lifestyle.
          </h2>
          <p className="subtitle">
            Ready for internet as exceptional as your address?
          </p>
        </div>

        <button className="button primary-fill-button" onClick={openModal}>
          Order Now
        </button>

        {/* Contact */}
        <div className="final-cta-contact-deck">
          <div className="final-cta-contact-email">
            <div className="final-cta-icon-body">
              <Email />
            </div>
            <p className="subtitle">info@mint.com.bd</p>
          </div>

          <div className="final-cta-contact-email">
            <div className="final-cta-icon-body">
              <Phone />
            </div>
            <p className="subtitle">09666773696</p>
          </div>
        </div>
      </CtaCard>
      {modalOpen && selectedPackage && (
        <ConnectionModal
          selectedPackage={selectedPackage}
          onClose={() => setModalOpen(false)}
        />
      )}
    </motion.section>
  );
}
