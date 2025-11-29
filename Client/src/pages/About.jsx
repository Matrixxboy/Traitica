import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-obsessive-black text-obsessive-text p-8 font-mono relative overflow-hidden">
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url('/assets/matrix_bg_about.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
          zIndex: 0,
        }}
      />
      <div className="max-w-4xl mx-auto relative z-10 py-12 px-4">
        <div className="border-b border-obsessive-dim pb-4 mb-8">
          <h1 className="text-3xl font-bold tracking-widest text-white mb-2">
            MISSION_STATEMENT
          </h1>
          <p className="text-xs text-obsessive-text/50">
            PROJECT: TRAITICA // PHASE 2
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6 text-obsessive-text/80 font-mono leading-relaxed">
            <p>
              <strong className="text-obsessive-cyan">Traitica</strong> is not
              merely a tool; it is a lens.
            </p>
            <p>
              In a world governed by chaotic variables, we seek the underlying
              constants. Through the synthesis of ancient archetypes (Astrology,
              Numerology) and modern data analysis, we aim to map the human
              psyche with mathematical precision.
            </p>
            <p>
              Our mission is to provide agents with the intelligence needed to
              navigate complex social interactions, predict behavioral outcomes,
              and optimize human connection.
            </p>
          </div>

          <div className="border border-obsessive-dim bg-obsessive-black/40 p-6 flex flex-col justify-center items-center text-center">
            <div className="w-24 h-24 border-2 border-obsessive-cyan rounded-full flex items-center justify-center mb-6 animate-pulse-fast">
              <span className="text-4xl">👁️</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">THE OBSERVER</h3>
            <p className="text-xs text-obsessive-text/60 max-w-xs">
              "We watch the patterns so you don't have to."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
