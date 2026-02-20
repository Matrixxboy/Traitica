import React, { useState, useEffect } from "react"

const SuspiciousOverlay = () => {
  const [glitchActive, setGlitchActive] = useState(false)
  const [warning, setWarning] = useState("")

  useEffect(() => {
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
      }
    }, 2000)

    // Random warning messages
    const warnings = [
      "UNAUTHORIZED_ACCESS_DETECTED",
      "SYSTEM_INTEGRITY_COMPROMISED",
      "TRACKING_ACTIVE...",
      "PACKET_LOSS_CRITICAL",
      "ENCRYPTION_KEY_INVALID",
    ]

    const warningInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        const randomWarning =
          warnings[Math.floor(Math.random() * warnings.length)]
        setWarning(randomWarning)
        setTimeout(() => setWarning(""), 3000)
      }
    }, 5000)

    return () => {
      clearInterval(glitchInterval)
      clearInterval(warningInterval)
    }
  }, [])

  return (
    <>
      {/* Static Noise already in global CSS, adding dynamic overlay */}
      <div
        className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-75 mix-blend-overlay ${
          glitchActive ? "opacity-30 bg-red-900" : "opacity-0"
        }`}
      ></div>

      {/* Random Shake Container for whole screen effect */}
      <div
        className={`fixed inset-0 pointer-events-none z-50 overflow-hidden ${
          glitchActive ? "translate-x-1" : ""
        }`}
      >
        {/* CRT Scanline moving */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/10 opacity-50 animate-[scan_4s_linear_infinite]"></div>
      </div>

      {/* Floating Warnings */}
      {warning && (
        <div className="fixed top-10 right-10 z-[100] bg-imposter-red text-black font-mono font-bold px-4 py-2 text-xs md:text-sm animate-pulse border border-red-500 shadow-[0_0_15px_rgba(255,0,0,0.5)]">
          ⚠ {warning}
        </div>
      )}
    </>
  )
}

export default SuspiciousOverlay
