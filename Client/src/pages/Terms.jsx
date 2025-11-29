import React from "react";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="border-b border-obsessive-dim pb-4 mb-8">
        <h1 className="text-3xl font-bold tracking-widest text-white mb-2">
          USER_AGREEMENT
        </h1>
        <p className="text-xs text-obsessive-text/50">
          NON-DISCLOSURE / LIABILITY WAIVER
        </p>
      </div>

      <div className="space-y-8 text-obsessive-text/80 font-mono text-sm md:text-base">
        <section>
          <h2 className="text-xl font-bold text-obsessive-cyan mb-4">
            1. AUTHORIZATION
          </h2>
          <p>
            Access to Traitica is a privilege, not a right. Unauthorized
            attempts to access restricted modules (Level 3+) will result in
            immediate IP termination and potential legal action under the
            [REDACTED] Cybersecurity Act.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-obsessive-cyan mb-4">
            2. INFORMATION_ACCURACY
          </h2>
          <p>
            The "Knowledge Base" contains theoretical models based on pattern
            recognition. Traitica assumes no liability for psychological
            distress caused by the realization of deterministic behavioral
            loops.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-obsessive-cyan mb-4">
            3. NON-DISCLOSURE
          </h2>
          <p>
            Users are strictly prohibited from sharing proprietary algorithms or
            "Subject Dossier" formats with external entities.
          </p>
        </section>

        <div className="mt-12 flex items-center justify-center">
          <button className="px-8 py-3 bg-obsessive-cyan text-black font-bold hover:bg-white transition-colors uppercase tracking-widest">
            I_ACKNOWLEDGE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
