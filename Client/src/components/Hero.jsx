import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  const [randomText, setRandomText] = React.useState("");

  React.useEffect(() => {
    const texts = [
      "SYSTEM_FAILURE",
      "UNAUTHORIZED_ACCESS",
      "BREACH_DETECTED",
      "ENCRYPTING_DATA...",
      "SIGNAL_LOST",
      "0x1A4F89",
      "CONNECTING...",
    ];
    const interval = setInterval(() => {
      setRandomText(texts[Math.floor(Math.random() * texts.length)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="hero-container"
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        pointerEvents: "none",
        overflow: "hidden",
        backgroundImage: `url('/assets/matrix_bg_home.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Noise Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
          opacity: 0.05,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Random Text Overlay */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          fontFamily: "'Courier Prime', monospace",
          color: "rgba(0, 255, 0, 0.3)",
          fontSize: "0.8rem",
          pointerEvents: "none",
        }}
      >
        {randomText}
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="glitch-text"
        data-text="TRAITICA"
        style={{
          fontSize: "clamp(2.5rem, 8vw, 6rem)",
          marginBottom: "1rem",
          textShadow: "0 0 10px #00ffff",
          padding: "0 1rem",
          zIndex: 2,
          lineHeight: 1.1,
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
          maxWidth: "90%",
          width: "600px",
          padding: "0 1rem",
          fontFamily: "'Courier Prime', monospace",
          letterSpacing: "1px",
          zIndex: 2,
        }}
      >
        Unlock the secrets of your personality through the{" "}
        <span style={{ color: "#ff0000" }}>[REDACTED]</span> and the mind.
      </motion.p>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        style={{ pointerEvents: "auto", zIndex: 2 }}
      >
        <Link
          to="/register"
          style={{
            padding: "1rem 2rem",
            fontSize: "1.2rem",
            background: "rgba(0, 0, 0, 0.8)",
            border: "1px solid #00ff00",
            borderRadius: "5px",
            color: "#00ff00",
            textDecoration: "none",
            transition: "all 0.3s ease",
            cursor: "pointer",
            fontFamily: "'Courier Prime', monospace",
            textTransform: "uppercase",
            letterSpacing: "2px",
            boxShadow: "0 0 10px rgba(0, 255, 0, 0.2)",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#00ff00";
            e.target.style.color = "#000000";
            e.target.style.boxShadow = "0 0 20px rgba(0, 255, 0, 0.5)";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "rgba(0, 0, 0, 0.8)";
            e.target.style.color = "#00ff00";
            e.target.style.boxShadow = "0 0 10px rgba(0, 255, 0, 0.2)";
          }}
        >
          Initialize Subject
        </Link>
      </motion.div>
    </div>
  );
};

export default Hero;
