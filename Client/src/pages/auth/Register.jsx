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
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <div className="relative w-full max-w-md p-8 bg-obsessive-black/60 backdrop-blur-md border border-obsessive-dim rounded-lg shadow-[0_0_30px_rgba(255,0,255,0.1)]">
        {/* Decorative corner */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-purple-500"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-500"></div>

        <h2 className="text-2xl font-bold text-center mb-8 tracking-[0.2em] text-white">
          NEW_ENTITY_REGISTRATION
        </h2>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-center text-sm">
            ERROR: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block mb-2 text-xs text-obsessive-text/60 tracking-wider">
              CODENAME (USERNAME)
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 bg-obsessive-dim border border-obsessive-dim rounded text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono"
            />
          </div>
          <div>
            <label className="block mb-2 text-xs text-obsessive-text/60 tracking-wider">
              COMM_LINK (EMAIL)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 bg-obsessive-dim border border-obsessive-dim rounded text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono"
            />
          </div>
          <div>
            <label className="block mb-2 text-xs text-obsessive-text/60 tracking-wider">
              SECURITY_KEY (PASSWORD)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 bg-obsessive-dim border border-obsessive-dim rounded text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full py-4 bg-purple-500/10 border border-purple-500 text-purple-500 font-bold tracking-widest hover:bg-purple-500 hover:text-black transition-all duration-300 uppercase"
          >
            REGISTER_ENTITY
          </button>
        </form>

        <p className="text-center mt-6 text-xs text-obsessive-text/60">
          Already registered?{" "}
          <Link to="/login" className="text-obsessive-cyan hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
