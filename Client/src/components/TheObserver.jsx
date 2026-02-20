import React, { useState, useEffect } from "react"

const TheObserver = () => {
  const [intensity, setIntensity] = useState(0)
  const [message, setMessage] = useState("")
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let lastX = 0
    let lastY = 0
    let speed = 0

    const handleMouseMove = (e) => {
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      speed = Math.sqrt(dx * dx + dy * dy)
      lastX = e.clientX
      lastY = e.clientY
      setMousePos({ x: e.clientX, y: e.clientY })

      // If user moves fast, increase intensity
      if (speed > 50) {
        setIntensity((prev) => Math.min(prev + 0.1, 1))
      } else {
        setIntensity((prev) => Math.max(prev - 0.05, 0))
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const messages = [
      "Why are you hurrying?",
      "We are watching.",
      "You cannot hide here.",
      "Your curiosity is noted.",
      "Do you feel safe?",
      "Obsession is a feature.",
    ]

    const interval = setInterval(() => {
      if (Math.random() > 0.9 - intensity * 0.5) {
        setMessage(messages[Math.floor(Math.random() * messages.length)])
        setTimeout(() => setMessage(""), 3000)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [intensity])

  return (
    <>
      {/* Vignette & texture */}
      <div className="fixed inset-0 pointer-events-none z-[100] mix-blend-multiply opacity-80 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>

      {/* Dynamic grain based on intensity */}
      <div
        className="fixed inset-0 pointer-events-none z-[99] opacity-[0.03] transition-opacity duration-100"
        style={{ opacity: 0.03 + intensity * 0.1 }}
      >
        <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-jitter"></div>
      </div>

      {/* The Observer Eye (follows cursor slowly) */}
      <div
        className="fixed z-[50] pointer-events-none transition-all duration-1000 ease-out mix-blend-screen opacity-10"
        style={{
          top: mousePos.y,
          left: mousePos.x,
          transform: `translate(-50%, -50%) scale(${1 + intensity})`,
        }}
      >
        <div className="w-64 h-64 rounded-full bg-obsession-violet blur-[80px]"></div>
      </div>

      {/* Unsettling Messages */}
      {message && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[101] text-corrupt-white font-mono text-xs tracking-[0.2em] opacity-80 animate-pulse text-center w-full">
          {message.split("").map((char, i) => (
            <span
              key={i}
              style={{ animationDelay: `${i * 0.05}s` }}
              className="animate-pulse"
            >
              {char}
            </span>
          ))}
        </div>
      )}
    </>
  )
}

export default TheObserver
