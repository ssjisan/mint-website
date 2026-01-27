"use client";

import { motion } from "framer-motion";
import Logo from "../Assets/Logo";
import "./Navbar.scss";
import toast from "react-hot-toast";

export default function Navbar() {
  const notify = () =>
    toast("We’ll start taking connection requests from this Friday.", {
      icon: "📢",
    });
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
      <button className="button primary-fill-button" onClick={notify}>
        Order Now
      </button>
    </motion.div>
  );
}
