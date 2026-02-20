import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const RedRoom = () => {
  const [panicLevel, setPanicLevel] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPanicLevel((prev) => Math.min(prev + 1, 100))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden text-imposter-red">
      {/* Background Pulse */}
      <div className="absolute inset-0 bg-imposter-red opacity-10 animate-breathe"></div>

      {/* Distorted Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [transform:perspective(500px)_rotateX(60deg)] opacity-20 pointer-events-none"></div>

      <div className="z-10 text-center space-y-8 max-w-2xl px-4">
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mix-blend-difference animate-pulse">
          DO NOT
          <br />
          ENTER
        </h1>

        <div className="font-mono text-sm tracking-[0.2em] opacity-80">
          <p className="animate-jitter">YOU ARE NOT IN CONTROL HERE.</p>
          <p className="mt-4 text-xs opacity-50">
            OBSESSION LEVEL: {panicLevel}%
          </p>
        </div>

        <div className="mt-12 p-8 border border-imposter-red/30 bg-black/50 backdrop-blur-sm relative">
          <p className="text-lg italic font-serif leading-loose">
            "You stare at the screen, hoping it will give you answers. But it
            only gives you reflections. We are not the AI. We are the mirror."
          </p>

          <div className="absolute -bottom-4 -right-4 text-[10rem] opacity-5 font-black z-[-1] select-none">
            EYE
          </div>
        </div>

        <div className="space-x-8 pt-12">
          <button
            className="text-xs uppercase tracking-widest border-b border-transparent hover:border-imposter-red transition-all opacity-50 hover:opacity-100 cursor-not-allowed"
            disabled
          >
            LEAVE (LOCKED)
          </button>
          <Link
            to="/"
            className="text-xs uppercase tracking-widest border border-white text-white px-6 py-3 hover:bg-white hover:text-black transition-colors animate-pulse"
          >
            SUBMIT to OBSESSION
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RedRoom
