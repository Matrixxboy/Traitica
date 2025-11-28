import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(10px)",
        zIndex: 100,
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div
        className="logo"
        style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold" }}
      >
        Traitica
      </div>
      <ul
        style={{
          display: "flex",
          gap: "2rem",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        <li>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            style={{ color: "white", textDecoration: "none" }}
          >
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
