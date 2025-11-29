import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-obsessive-black/80 backdrop-blur-md border-b border-obsessive-dim">
      <Link
        to="/"
        className="text-xl font-bold tracking-tighter hover:text-obsessive-cyan transition-colors group"
      >
        <span className="text-obsessive-accent group-hover:animate-pulse">
          &gt;
        </span>{" "}
        TRAITICA
      </Link>

      <ul className="flex gap-6 md:gap-8 text-sm md:text-base">
        {[
          { path: "/", label: "INDEX" },
          { path: "/login", label: "LOGIN" },
          { path: "/register", label: "REGISTER" },
          { path: "/profile", label: "PROFILE" },
        ].map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`relative transition-colors duration-300 ${
                isActive(link.path)
                  ? "text-obsessive-cyan"
                  : "text-obsessive-text/70 hover:text-obsessive-text"
              }`}
            >
              {isActive(link.path) && (
                <span className="absolute -left-3 text-obsessive-accent animate-pulse">
                  ●
                </span>
              )}
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
