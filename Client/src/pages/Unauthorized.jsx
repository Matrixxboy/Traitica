import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-black text-cyan-400 font-mono selection:bg-cyan-900 selection:text-white">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_1px,_#000_1px),_linear-gradient(90deg,transparent_1px,_#000_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 z-0"></div>

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(0,255,255,0.03)_1px,rgba(0,255,255,0.03)_2px)] z-10"></div>

      {/* Main Content Container */}
      <div className="relative z-20 flex flex-col items-center p-8 border border-cyan-900/50 rounded-lg bg-black/40 backdrop-blur-sm shadow-[0_0_50px_-12px_rgba(6,182,212,0.2)]">
        {/* Glitchy Header */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
          401
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold tracking-widest mb-8 text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)] uppercase">
          Access Denied
        </h2>

        <p className="text-lg text-cyan-200/70 mb-10 text-center max-w-md leading-relaxed">
          Security protocols engaged. Biometric verification failed.
          <br />
          You are not authorized to view this sector.
        </p>

        {/* Action Button */}
        <button
          onClick={() => navigate("/login")}
          className="group relative px-8 py-3 text-lg font-bold tracking-widest uppercase transition-all duration-300 bg-transparent border-2 border-cyan-500 rounded hover:bg-cyan-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
        >
          <span className="relative z-10">Initiate Login</span>
          <div className="absolute inset-0 h-full w-full scale-0 rounded transition-all duration-300 group-hover:scale-100 group-hover:bg-cyan-500/20"></div>
        </button>
      </div>

      {/* Footer / System Status */}
      <div className="absolute bottom-8 text-xs text-cyan-900/50 uppercase tracking-[0.2em]">
        System ID: TR-8820-X • Secure Connection
    </div>
    </div>
  );
};

export default Unauthorized;
