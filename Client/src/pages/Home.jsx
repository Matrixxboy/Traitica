import React from "react"
import { Link } from "react-router-dom"
import TerminalHero from "../components/TerminalHero"

const topics = [
  {
    id: "01",
    title: "NUMEROLOGY",
    desc: "Analysis of divine relationships between numbers and coinciding events.",
    status: "ACTIVE",
  },
  {
    id: "02",
    title: "BLOOD_GROUP_THEORY",
    desc: "Personality correlation based on hemotype antigens.",
    status: "RESEARCHING",
  },
  {
    id: "03",
    title: "SIBLING_ORDER",
    desc: "Psychological development patterns based on birth rank.",
    status: "LOCKED",
  },
  {
    id: "04",
    title: "BIRTH_SEASON",
    desc: "Environmental influence on early developmental stages.",
    status: "LOCKED",
  },
  {
    id: "05",
    title: "ASTROLOGY_VEDIC",
    desc: "Planetary alignment influence based on sidereal calculations.",
    status: "ACTIVE",
  },
  {
    id: "06",
    title: "MBTI_CORRELATION",
    desc: "Cross-referencing cognitive functions with biological markers.",
    status: "PENDING",
  },
]

const Home = () => {
  const obsessions = [
    { id: "01", title: "THE_GARDEN", desc: "Where we grow your fears." },
    {
      id: "02",
      title: "ECHO_CHAMBER",
      desc: "You wanted to be heard. Now you cannot leave.",
    },
    {
      id: "03",
      title: "VOID_GATE",
      desc: "Stare long enough, and it stares back.",
    },
    {
      id: "04",
      title: "PATTERN_RECOGNITION",
      desc: "We know what you will do next.",
    },
    { id: "05", title: "MEMORY_LEAK", desc: "Forget what you came for." },
    {
      id: "06",
      title: "RED_ROOM",
      desc: "Do not enter. You will enter anyway.",
      special: true,
    },
  ]

  return (
    <div className="w-full relative">
      <div className="mb-12 relative z-20">
        <TerminalHero />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 px-4">
        {obsessions.map((item) => (
          <div
            key={item.id}
            className={`group relative border p-8 transition-all duration-700 overflow-hidden ${
              item.special
                ? "border-imposter-red bg-imposter-red/5 hover:bg-imposter-red/10"
                : "border-obsession-violet/30 bg-void-black/80 hover:border-obsession-violet"
            }`}
          >
            {/* Hover Glitch Background */}
            <div className="absolute inset-0 bg-obsession-violet/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] tracking-[0.2em] text-gray-500 group-hover:text-corrupt-white transition-colors">
                    OBSESSION_{item.id}
                  </span>
                  {item.special && (
                    <span className="text-[10px] text-imposter-red animate-pulse">
                      LOCKED_BY_ADMIN
                    </span>
                  )}
                </div>

                <h3
                  className={`text-2xl font-bold mb-4 font-mono transition-colors ${
                    item.special
                      ? "text-imposter-red group-hover:text-white"
                      : "text-gray-400 group-hover:text-obsession-violet"
                  }`}
                >
                  {item.title}
                </h3>
              </div>

              <div>
                <p className="text-xs text-gray-600 mb-6 group-hover:text-gray-300 transition-colors leading-relaxed font-mono">
                  {item.desc}
                </p>

                <Link
                  to={item.special ? "/red-room" : "#"}
                  className={`inline-block text-xs uppercase tracking-widest border-b border-transparent group-hover:border-current pb-1 transition-all ${
                    item.special
                      ? "text-imposter-red"
                      : "text-gray-500 group-hover:text-white"
                  }`}
                >
                  {item.special ? "VIOLATE_PROTOCOL" : "INITIATE"}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 text-center text-[10px] text-gray-800 font-mono tracking-[0.5em] hover:text-red-900 transition-colors cursor-help select-none">
        THERE IS NO ESCAPE FROM YOUR OWN MIND
      </div>
    </div>
  )
}

export default Home
