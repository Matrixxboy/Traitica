import React from "react";

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="border-b border-obsessive-dim pb-4 mb-8">
        <h1 className="text-3xl font-bold tracking-widest text-white mb-2">
          DATA_COLLECTION_PROTOCOL
        </h1>
        <p className="text-xs text-obsessive-text/50">REF: PRIV-2025-SEC-9</p>
      </div>

      <div className="space-y-8 text-obsessive-text/80 font-mono text-sm md:text-base">
        <section>
          <h2 className="text-xl font-bold text-obsessive-cyan mb-4">
            1. SURVEILLANCE_SCOPE
          </h2>
          <p className="mb-4">
            Traitica systems automatically log all interaction vectors. By
            accessing this terminal, you consent to the monitoring of:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-obsessive-text/60">
            <li>IP_ADDRESS and GEOLOCATION_DATA</li>
            <li>DEVICE_FINGERPRINT and BROWSER_METADATA</li>
            <li>KEYSTROKE_DYNAMICS and NAVIGATION_PATTERNS</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-obsessive-cyan mb-4">
            2. DATA_RETENTION
          </h2>
          <p>
            All collected data is encrypted and stored in [REDACTED] server
            farms. Retention periods are indefinite unless a PURGE_REQUEST is
            authorized by Level 5 personnel.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-obsessive-cyan mb-4">
            3. THIRD_PARTY_SHARING
          </h2>
          <p>
            We do not sell data to commercial entities. However, data may be
            shared with:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-obsessive-text/60">
            <li>GLOBAL_INTELLIGENCE_NETWORKS</li>
            <li>PREDICTIVE_BEHAVIOR_ALGORITHMS</li>
            <li>[REDACTED_GOVERNMENT_AGENCIES]</li>
          </ul>
        </section>

        <div className="mt-12 p-4 border border-obsessive-accent/30 bg-obsessive-accent/5 text-xs">
          WARNING: ATTEMPTING TO OBFUSCATE YOUR DIGITAL FOOTPRINT WHILE
          ACCESSING THIS TERMINAL IS A VIOLATION OF TERMS.
        </div>
      </div>
    </div>
  );
};

export default Privacy;
