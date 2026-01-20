"use client";

import { motion } from "framer-motion";
import Logo from "../Assets/Logo";
import "./Navbar.scss";

export default function Navbar() {
  return (
    <motion.div
      className="navbar-container"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      <Logo />
      <button className="button primary-fill-button">Order Now</button>
    </motion.div>
  );
}
