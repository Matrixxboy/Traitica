import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Scene3D from "../components/Scene3D";

const MainLayout = () => {
  return (
    <div
      className="main-layout"
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        color: "white",
        fontFamily: "monospace",
      }}
    >
      <Scene3D />
      <Navbar />

      {/* Flash Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "white",
          pointerEvents: "none",
          zIndex: 9999,
          animation: "flash 10s infinite",
        }}
      ></div>

      {/* Random/Messy Decorative Elements */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "5%",
          fontSize: "0.8rem",
          opacity: 0.5,
          transform: "rotate(-15deg)",
          pointerEvents: "none",
        }}
        className="glitch-text"
      >
        SYSTEM_STATUS: CRITICAL
        <br />
        NEURAL_LOAD: 98%
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "100px",
          height: "100px",
          border: "1px dashed rgba(255,255,255,0.3)",
          transform: "rotate(45deg)",
          pointerEvents: "none",
        }}
        className="twitch-element"
      ></div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "-20px",
          fontSize: "4rem",
          opacity: 0.1,
          writingMode: "vertical-rl",
          pointerEvents: "none",
        }}
      >
        TRAITICA
      </div>
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "10px",
          height: "10px",
          background: "#00ffff",
          boxShadow: "0 0 10px #00ffff",
          borderRadius: "50%",
          animation: "pulse 2s infinite",
          pointerEvents: "none",
        }}
      ></div>

      {/* Creepy Text */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "40%",
          fontSize: "0.6rem",
          opacity: 0.3,
          pointerEvents: "none",
          color: "red",
        }}
        className="glitch-text"
      >
        DONT BLINK
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "20%",
          fontSize: "1.5rem",
          opacity: 0.1,
          pointerEvents: "none",
          transform: "rotate(90deg)",
        }}
      >
        👁️
      </div>

      <div
        className="content-wrapper"
        style={{ position: "relative", zIndex: 1, paddingTop: "80px" }}
      >
        <Outlet />
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
          100% { opacity: 0.5; transform: scale(1); }
        }
        /* Global Scrollbar Styling for that 'Tech' feel */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #000; 
        }
        ::-webkit-scrollbar-thumb {
          background: #333; 
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555; 
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
