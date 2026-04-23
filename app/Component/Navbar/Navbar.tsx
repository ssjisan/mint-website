"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package } from "@/app/lib/types/package";
import axios from "../../lib/axios";
import toast from "react-hot-toast";
import "./Navbar.scss";
import ConnectionModal from "../Home/ConnectionModal/ConnectionModal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

/* ================= ANIMATION ================= */

const navbarVariant = {
  hidden: {
    opacity: 0,
    y: -32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

/* ================= COMPONENT ================= */

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const pathname = usePathname();

  /* ================= SCROLL SECTION TRACKING ================= */

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["residential", "enterprise", "security", "stories"];
      const scrollPosition = window.scrollY + 120;

      let foundSection = "";

      for (const id of sections) {
        const element = document.getElementById(id);
        if (!element) continue;

        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          foundSection = id;
          break;
        }
      }

      setActiveSection(foundSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= PACKAGE LOGIC ================= */

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

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <motion.div
        className="navbar-container"
        variants={navbarVariant}
        initial="hidden"
        animate="visible"
      >
        {/* LOGO */}
        <Link href="/" className="logo" onClick={handleLogoClick}>
          <Image src="/Logo.svg" alt="Logo" width={64} height={64} priority />
        </Link>

        {/* DESKTOP MENU */}
        <div className="nav-menu">
          {["residential", "enterprise", "security", "stories"].map((id) => (
            <Link
              key={id}
              className={`nav-pill ${activeSection === id ? "active" : ""}`}
              href={`/#${id}`}
            >
              {id === "stories"
                ? "Success Stories"
                : id.charAt(0).toUpperCase() + id.slice(1)}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <button
          className="button primary-fill-button desktop-mint"
          onClick={openModal}
        >
          Get Mint
        </button>

        {/* HAMBURGER */}
        <button
          className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </motion.div>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {["residential", "enterprise", "security", "stories"].map((id) => (
            <Link
              key={id}
              href={`/#${id}`}
              onClick={() => setMobileMenuOpen(false)}
              className={`nav-pill ${activeSection === id ? "active" : ""}`}
            >
              {id === "stories"
                ? "Success Stories"
                : id.charAt(0).toUpperCase() + id.slice(1)}
            </Link>
          ))}

          <button
            className="button primary-fill-button"
            onClick={() => {
              openModal();
              setMobileMenuOpen(false);
            }}
          >
            Get Mint
          </button>
        </div>
      )}

      {/* ================= MODAL ================= */}
      {modalOpen && selectedPackage && (
        <ConnectionModal
          selectedPackage={selectedPackage}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
