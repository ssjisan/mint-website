"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Logo from "../Assets/Logo";
import { Package } from "@/app/lib/types/package"; // same Package type
import axios from "../../lib/axios";
import toast from "react-hot-toast";
import "./Navbar.scss";
import ConnectionModal from "../Home/ConnectionModal/ConnectionModal";
import Link from "next/link";

export default function Navbar() {
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

  // Open modal button handler
  const openModal = () => {
    if (!packages.length) {
      fetchPackages().then(() => setModalOpen(true));
    } else {
      setModalOpen(true);
    }
  };

  return (
    <>
      <motion.div
        className="navbar-container"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      >
        <Link href="/">
          <Logo /></Link>
        <button className="button primary-fill-button" onClick={openModal}>
          Order Now
        </button>
      </motion.div>

      {/* Modal */}
      {modalOpen && selectedPackage && (
        <ConnectionModal
          selectedPackage={selectedPackage}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
