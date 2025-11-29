import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-obsessive-black/90 border-t border-obsessive-dim p-2 text-[10px] md:text-xs text-obsessive-text/50 z-30 flex justify-between items-center backdrop-blur-sm">
      <div className="flex gap-4 items-center">
        <span>SYS.STATUS: ONLINE</span>
        <span className="hidden md:inline">ENCRYPTION: AES-256</span>
        <span className="hidden md:inline text-obsessive-dim">|</span>
        <Link
          to="/about"
          className="hover:text-obsessive-cyan transition-colors"
        >
          ABOUT
        </Link>
        <Link
          to="/privacy"
          className="hover:text-obsessive-cyan transition-colors"
        >
          PRIVACY
        </Link>
        <Link
          to="/terms"
          className="hover:text-obsessive-cyan transition-colors"
        >
          TERMS
        </Link>
        <Link
          to="/archives"
          className="hover:text-obsessive-cyan transition-colors"
        >
          ARCHIVES
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <Link
          to="/matrixxboy"
          className="text-obsessive-black hover:text-obsessive-dim/20 transition-colors cursor-default select-none"
          title="???"
        >
          MXB
        </Link>
        <div className="animate-pulse text-obsessive-accent">
          ● RECORDING_SESSION
        </div>
      </div>
    </footer>
  );
};

export default Footer;
