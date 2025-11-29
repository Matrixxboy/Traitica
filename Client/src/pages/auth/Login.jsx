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
    <div className="min-h-screen bg-obsessive-black text-obsessive-text flex items-center justify-center p-4 font-mono relative overflow-hidden">
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url('/assets/matrix_bg_auth.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
          zIndex: 0,
        }}
      />
      <div className="w-full max-w-md relative z-10 p-8 bg-obsessive-black/60 backdrop-blur-md border border-obsessive-dim rounded-lg shadow-[0_0_30px_rgba(0,255,255,0.1)]">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-obsessive-cyan"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-obsessive-cyan"></div>

        <h2 className="text-2xl font-bold text-center mb-8 tracking-[0.2em] text-white">
          ACCESS_TERMINAL
        </h2>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-center text-sm">
            ERROR: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block mb-2 text-xs text-obsessive-text/60 tracking-wider">
              USER_ID (EMAIL)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 bg-obsessive-dim border border-obsessive-dim rounded text-white focus:outline-none focus:border-obsessive-cyan focus:ring-1 focus:ring-obsessive-cyan transition-all font-mono"
            />
          </div>
          <div>
            <label className="block mb-2 text-xs text-obsessive-text/60 tracking-wider">
              PASSCODE
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 bg-obsessive-dim border border-obsessive-dim rounded text-white focus:outline-none focus:border-obsessive-cyan focus:ring-1 focus:ring-obsessive-cyan transition-all font-mono"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full py-4 bg-obsessive-cyan/10 border border-obsessive-cyan text-obsessive-cyan font-bold tracking-widest hover:bg-obsessive-cyan hover:text-black transition-all duration-300 uppercase"
          >
            Initiate_Session
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
