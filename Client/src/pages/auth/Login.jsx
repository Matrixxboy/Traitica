import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await authApi.login({ email, password });
      // Backend returns data wrapped in a standardized response structure
      // response.data.data.access_token
      if (
        response.data &&
        response.data.data &&
        response.data.data.access_token
      ) {
        localStorage.setItem("token", response.data.data.access_token);
        console.log("Login successful");
        navigate("/");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Invalid email or password");
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
          boxShadow: "0 0 20px rgba(0, 255, 255, 0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative corner */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "30px",
            height: "30px",
            borderTop: "2px solid #00ffff",
            borderRight: "2px solid #00ffff",
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
          ACCESS_TERMINAL
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
              USER_ID (EMAIL)
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
              PASSCODE
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
              background: "linear-gradient(45deg, #00ffff, #0088ff)",
              border: "none",
              borderRadius: "5px",
              color: "black",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "1rem",
              letterSpacing: "1px",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.02)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            INITIATE_SESSION
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
