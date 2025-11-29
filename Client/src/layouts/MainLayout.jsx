import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen bg-obsessive-black text-obsessive-text font-mono overflow-hidden selection:bg-obsessive-accent selection:text-black">
      {/* Global Scanline Effect */}
      <div className="scanlines fixed inset-0 pointer-events-none z-50 opacity-20"></div>

      {/* CRT Flicker Overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-white opacity-[0.02] crt-flicker mix-blend-overlay"></div>

      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(transparent_1px,_#000_1px),_linear-gradient(90deg,transparent_1px,_#000_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)] opacity-10"></div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="relative z-10 pt-20 px-4 md:px-8 max-w-7xl mx-auto min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>

      {/* Footer / System Status */}
      <Footer />
    </div>
  );
};

export default MainLayout;
