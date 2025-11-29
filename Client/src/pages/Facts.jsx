import React from "react";
import { motion } from "framer-motion";

const facts = [
  {
    id: 1,
    title: "THE_SHADOW_SELF",
    description:
      "Your shadow self contains all the parts of you that you've rejected. Integrating it is key to wholeness.",
    image: "/assets/fact_placeholder.png",
  },
  {
    id: 2,
    title: "COSMIC_BLUEPRINT",
    description:
      "Your birth chart is a snapshot of the cosmos at the moment you took your first breath. It's your soul's map.",
    image: "/assets/fact_placeholder.png",
  },
  {
    id: 3,
    title: "NEURAL_PATTERNS",
    description:
      "Habits are just neural pathways reinforced over time. You can rewire your brain through conscious repetition.",
    image: "/assets/fact_placeholder.png",
  },
  {
    id: 4,
    title: "COLLECTIVE_UNCONSCIOUS",
    description:
      "We are all connected through a shared reservoir of experiences and archetypes. You are never truly alone.",
    image: "/assets/fact_placeholder.png",
  },
  {
    id: 5,
    title: "SYNCHRONICITY",
    description:
      "Meaningful coincidences are the universe's way of winking at you. Pay attention to the signs.",
    image: "/assets/fact_placeholder.png",
  },
  {
    id: 6,
    title: "THE_OBSERVER_EFFECT",
    description:
      "The act of observing changes the observed. Your attention shapes your reality.",
    image: "/assets/fact_placeholder.png",
  },
];

const Facts = () => {
  return (
    <div className="min-h-screen bg-obsessive-black text-obsessive-text font-mono relative overflow-hidden">
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url('/assets/matrix_bg_facts.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
          zIndex: 0,
        }}
      />

      <div className="max-w-6xl mx-auto py-12 px-4 relative z-10">
        <div className="border-b border-obsessive-dim pb-4 mb-12 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold tracking-widest text-white mb-2 glitch-text"
            data-text="CLASSIFIED_FACTS"
          >
            CLASSIFIED_FACTS
          </h1>
          <p className="text-sm text-obsessive-text/50">
            ACCESS_LEVEL: RESTRICTED // EYES_ONLY
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facts.map((fact, index) => (
            <motion.div
              key={fact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-obsessive-black/60 backdrop-blur-sm border border-obsessive-dim p-4 rounded-lg hover:border-obsessive-cyan transition-colors duration-300 group"
            >
              <div className="overflow-hidden rounded-md mb-4 border border-obsessive-dim/50 group-hover:border-obsessive-cyan/50 transition-colors">
                <img
                  src={fact.image}
                  alt={fact.title}
                  className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-obsessive-cyan transition-colors">
                {fact.title}
              </h3>
              <p className="text-sm text-obsessive-text/80 leading-relaxed">
                {fact.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Facts;
