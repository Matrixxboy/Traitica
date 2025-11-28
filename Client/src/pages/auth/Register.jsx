import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authApi from "../../api/authApi";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await authApi.register({ username, email, password });
      console.log("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div
      className="login-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(10px)",
          padding: "3rem",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 0 20px rgba(255, 0, 255, 0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative corner */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "30px",
            height: "30px",
            borderTop: "2px solid #ff00ff",
            borderLeft: "2px solid #ff00ff",
          }}
        ></div>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            color: "#fff",
            letterSpacing: "2px",
          }}
        >
          NEW_ENTITY_REGISTRATION
        </h2>
        {error && (
          <p
            style={{
              color: "#ff4444",
              textAlign: "center",
              marginBottom: "1rem",
              background: "rgba(255,0,0,0.1)",
              padding: "0.5rem",
            }}
          >
            {error}
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#aaa",
                fontSize: "0.8rem",
              }}
            >
              CODENAME (USERNAME)
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.8rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "5px",
                color: "white",
                outline: "none",
                fontFamily: "monospace",
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#aaa",
                fontSize: "0.8rem",
              }}
            >
              COMM_LINK (EMAIL)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.8rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "5px",
                color: "white",
                outline: "none",
                fontFamily: "monospace",
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#aaa",
                fontSize: "0.8rem",
              }}
            >
              SECURITY_KEY (PASSWORD)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.8rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "5px",
                color: "white",
                outline: "none",
                fontFamily: "monospace",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "1rem",
              background: "linear-gradient(45deg, #ff00ff, #aa00ff)",
              border: "none",
              borderRadius: "5px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "1rem",
              letterSpacing: "1px",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.02)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            REGISTER_ENTITY
          </button>
        </form>
        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.9rem",
            color: "#aaa",
          }}
        >
          Already registered?{" "}
          <Link to="/login" style={{ color: "#00ffff" }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
