"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "../Assets/Logo";
import { Package } from "@/app/lib/types/package";
import axios from "../../lib/axios";
import toast from "react-hot-toast";
import "./Navbar.scss";
import ConnectionModal from "../Home/ConnectionModal/ConnectionModal";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Next.js hook

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault(); // prevent navigation
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
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

      // 🔥 If no section found → clear active state
      setActiveSection(foundSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const fetchPackages = async () => {
    try {
      const res = await axios.get("/packages");
      setPackages(res.data.packages);
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
    <>
      <motion.div
        className="navbar-container"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Link href="/" className="logo" onClick={handleLogoClick}>
          <Logo width={64} height={64} />
        </Link>

        {/* Desktop Menu */}
        <div className="nav-menu">
          <a className={`nav-pill ${activeSection === "residential" ? "active" : ""}`}
            href="/#residential">
            Residential
          </a>
          <a className={`nav-pill ${activeSection === "enterprise" ? "active" : ""}`} href="/#enterprise">
            Enterprise
          </a>
          <a className={`nav-pill ${activeSection === "security" ? "active" : ""}`} href="/#security">
            Security
          </a>
          <a className={`nav-pill ${activeSection === "stories" ? "active" : ""}`} href="/#stories">
            Success Stories
          </a>
        </div>

        {/* Desktop Button */}
        <button
          className="button primary-fill-button desktop-mint"
          onClick={openModal}
        >
          Get Mint
        </button>

        {/* Mobile Hamburger */}
        <button
          className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </motion.div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Link href="/#residential" onClick={() => setMobileMenuOpen(false)} className={`nav-pill ${activeSection === "residential" ? "active" : ""}`}>
            Residential
          </Link>
          <Link href="/#enterprise" onClick={() => setMobileMenuOpen(false)} className={`nav-pill ${activeSection === "enterprise" ? "active" : ""}`}>
            Enterprise
          </Link>
          <Link href="/#security" onClick={() => setMobileMenuOpen(false)} className={`nav-pill ${activeSection === "security" ? "active" : ""}`}>
            Security
          </Link>
          <Link href="/#stories" onClick={() => setMobileMenuOpen(false)} className={`nav-pill ${activeSection === "stories" ? "active" : ""}`}>
            Success Stories
          </Link>

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

      {modalOpen && selectedPackage && (
        <ConnectionModal
          selectedPackage={selectedPackage}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}