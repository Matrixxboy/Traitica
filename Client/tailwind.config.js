/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "obsessive-black": "#0a0a0a",
        "obsessive-text": "#e0e0e0",
        "obsessive-accent": "#ff0000",
        "obsessive-cyan": "#00ffff",
        "obsessive-dim": "rgba(255, 255, 255, 0.1)",
        "imposter-red": "#ff0000",
        "imposter-dark": "#050505",
        "obsession-violet": "#2e0b4d",
        "void-black": "#020105",
        "corrupt-white": "#f0f0f0", // Slightly off-white
      },
      fontFamily: {
        mono: ["Courier Prime", "monospace"],
        sans: ["Inter", "sans-serif"], // Adding a sans font for contrast if needed
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glitch: "glitch 1s linear infinite",
        shake: "shake 0.5s cubic-bezier(.36,.07,.19,.97) both",
        breathe: "breathe 4s ease-in-out infinite",
        jitter: "jitter 0.3s linear infinite",
      },
      keyframes: {
        glitch: {
          "2%, 64%": { transform: "translate(2px,0) skew(0deg)" },
          "4%, 60%": { transform: "translate(-2px,0) skew(0deg)" },
          "62%": { transform: "translate(0,0) skew(5deg)" },
        },
        shake: {
          "10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
          "20%, 80%": { transform: "translate3d(2px, 0, 0)" },
          "30%, 50%, 70%": { transform: "translate3d(-4px, 0, 0)" },
          "40%, 60%": { transform: "translate3d(4px, 0, 0)" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.8", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
        },
        jitter: {
          "0%": { transform: "translate(0,0)" },
          "25%": { transform: "translate(1px, 1px)" },
          "50%": { transform: "translate(-1px, -1px)" },
          "75%": { transform: "translate(-1px, 1px)" },
          "100%": { transform: "translate(1px, -1px)" },
        },
      },
    },
  },
  plugins: [],
}
