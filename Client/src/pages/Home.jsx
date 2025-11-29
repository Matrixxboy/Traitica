import React from "react";
import { Link } from "react-router-dom";
import TerminalHero from "../components/TerminalHero";

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
];

const Home = () => {
  return (
    <div className="min-h-screen w-full">
      {/* Interactive Terminal Hero */}
      <div className="mb-12">
        <TerminalHero />
      </div>

      {/* Grid of Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="group relative border border-obsessive-dim bg-obsessive-black/40 p-6 hover:border-obsessive-cyan transition-all duration-300 hover:bg-obsessive-dim/5"
          >
            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-obsessive-dim group-hover:border-obsessive-cyan transition-colors"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-obsessive-dim group-hover:border-obsessive-cyan transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-obsessive-dim group-hover:border-obsessive-cyan transition-colors"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-obsessive-dim group-hover:border-obsessive-cyan transition-colors"></div>

            <div className="flex justify-between items-start mb-4">
              <span className="text-xs text-obsessive-text/40 font-bold">
                IDX_{topic.id}
              </span>
              <span
                className={`text-[10px] px-2 py-1 border ${
                  topic.status === "ACTIVE"
                    ? "border-obsessive-cyan text-obsessive-cyan"
                    : "border-obsessive-dim text-obsessive-text/40"
                }`}
              >
                {topic.status}
              </span>
            </div>

            <h3 className="text-xl font-bold mb-2 group-hover:text-obsessive-cyan transition-colors">
              {topic.title}
            </h3>
            <p className="text-sm text-obsessive-text/60 mb-6 leading-relaxed">
              {topic.desc}
            </p>

            <Link
              to="#"
              className={`inline-flex items-center text-sm font-bold uppercase tracking-wider ${
                topic.status === "LOCKED"
                  ? "text-obsessive-text/20 cursor-not-allowed"
                  : "text-obsessive-accent hover:text-obsessive-cyan"
              }`}
            >
              {topic.status === "LOCKED" ? "ACCESS DENIED" : "READ_FILE"}
              {topic.status !== "LOCKED" && (
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                  &gt;
                </span>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
