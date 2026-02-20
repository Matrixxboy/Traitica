import React, { useState, useEffect } from "react"
import RedactedText from "../components/RedactedText"

const Creator = () => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })
  const [tracking, setTracking] = useState("OBSERVING...")

  useEffect(() => {
    const interval = setInterval(() => {
      setCoordinates({
        x: (Math.random() * 180 - 90).toFixed(6),
        y: (Math.random() * 360 - 180).toFixed(6),
      })
      setTracking(Math.random() > 0.8 ? "LOCKING..." : "OBSERVING...")
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-4xl mx-auto py-24 px-4 relative min-h-screen flex flex-col justify-center">
      {/* Tracking Widget */}
      <div className="fixed top-24 right-4 md:right-10 p-4 font-mono text-[10px] text-obsession-violet glass-void animate-breathe z-50 border-r-2 border-obsession-violet">
        <div className="opacity-50">STATUS: {tracking}</div>
        <div className="opacity-50">LAT: {coordinates.x}</div>
        <div className="opacity-50">LON: {coordinates.y}</div>
        <div className="w-full h-[1px] bg-obsession-violet/30 my-2"></div>
        <div className="animate-pulse text-corrupt-white">
          TARGET_ID: ABD-000
        </div>
      </div>

      <div className="border-b border-obsession-violet/20 pb-4 mb-12 flex justify-between items-end relative">
        <div className="absolute -inset-4 bg-obsession-violet/5 blur-xl animate-pulse"></div>
        <div className="relative">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-corrupt-white mb-2 mix-blend-overlay">
            CREATOR_DOSSIER
          </h1>
          <p className="text-xs text-obsession-violet font-mono tracking-[0.3em]">
            // CLASSIFIED // DEEP_VOID_ONLY
          </p>
        </div>
      </div>

      <div className="glass-void p-12 relative overflow-hidden group transition-all duration-1000 hover:shadow-[0_0_100px_rgba(46,11,77,0.3)] border border-obsession-violet/10">
        {/* Watermark */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[12rem] font-black text-obsession-violet/5 rotate-[-15deg] pointer-events-none whitespace-nowrap select-none animate-breathe blur-sm">
          ARCHITECT
        </div>

        <div className="relative z-10 space-y-12 text-gray-400 leading-relaxed font-mono">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 bg-void-black border border-obsession-violet/30 flex items-center justify-center text-obsession-violet text-xs p-2 text-center animate-jitter shadow-[0_0_20px_rgba(46,11,77,0.2)]">
              [IMAGE_CORRUPTED]
              <br />
              ERR_404
            </div>
            <div className="flex-1 space-y-6">
              <div>
                <span className="text-obsession-violet text-xs tracking-widest block mb-1">
                  IDENTITY_SIGNATURE
                </span>
                <div className="text-2xl text-corrupt-white font-bold tracking-widest text-fractured">
                  ABD_PSYCHO
                </div>
              </div>

              <div>
                <span className="text-obsession-violet text-xs tracking-widest block mb-1">
                  ORIGIN_POINT
                </span>
                <p className="text-sm">
                  <RedactedText text="VOID_SECTOR_0" placeholder="[UNKNOWN]" />
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-l-2 border-obsession-violet/50 bg-void-black/50 backdrop-blur-md">
            <h3 className="text-obsession-violet text-xs font-bold mb-4 tracking-widest">
              PSYCHOLOGICAL_PROFILE:
            </h3>
            <p className="text-sm italic opacity-70 leading-loose">
              "The subject does not build. The subject{" "}
              <span className="text-corrupt-white">infects</span>. Traitica is
              not a project; it is a manifestation of{" "}
              <RedactedText
                text="unresolved obsession"
                placeholder="[REDACTED]"
              />
              . Every line of code is a scream into the void."
            </p>
          </div>

          <div className="text-center py-12">
            <p className="text-lg md:text-2xl tracking-widest text-obsession-violet/60 font-black animate-pulse">
              "COMFORT IS A LIE."
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-obsession-violet/10 flex justify-between items-center opacity-50 hover:opacity-100 transition-opacity">
            <div className="text-[10px] tracking-widest">
              DOC_ID: ABD-PSYCHO-V1
            </div>
            <button className="text-[10px] border border-obsession-violet text-obsession-violet px-6 py-3 hover:bg-obsession-violet hover:text-black transition-all uppercase tracking-[0.2em] animate-jitter">
              INITIATE_CONTACT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Creator
