import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="hero-container"
      style={{
        position: "relative",
        zIndex: 1,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        pointerEvents: "none",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="glitch-text"
        style={{
          fontSize: "clamp(2.5rem, 8vw, 6rem)",
          marginBottom: "1rem",
          textShadow: "0 0 10px #00ffff",
          padding: "0 1rem",
        }}
      >
        TRAITICA
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{
          fontSize: "clamp(1rem, 4vw, 1.5rem)",
          marginBottom: "2rem",
          maxWidth: "600px",
          padding: "0 1rem",
        }}
      >
        Unlock the secrets of your personality through the cosmos and the mind.
      </motion.p>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        style={{ pointerEvents: "auto" }}
      >
        <Link
          to="/register"
          style={{
            padding: "1rem 2rem",
            fontSize: "1.2rem",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "30px",
            color: "white",
            textDecoration: "none",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onMouseOver={(e) =>
            (e.target.style.background = "rgba(255, 255, 255, 0.2)")
          }
          onMouseOut={(e) =>
            (e.target.style.background = "rgba(255, 255, 255, 0.1)")
          }
        >
          Get Started
        </Link>
      </motion.div>
    </div>
  );
};

export default Hero;
