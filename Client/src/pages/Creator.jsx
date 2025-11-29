import React from "react";

const Creator = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="border-b border-obsessive-dim pb-4 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-widest text-white mb-2">
            CREATOR_DOSSIER
          </h1>
          <p className="text-xs text-obsessive-text/50">
            CLASSIFICATION: TOP SECRET // EYES ONLY
          </p>
        </div>
        <div className="text-right text-xs text-obsessive-text/50">
          <p>SUBJECT: MATRIXXBOY</p>
          <p>STATUS: UNKNOWN</p>
        </div>
      </div>

      <div className="border border-obsessive-dim bg-obsessive-black/40 p-8 relative overflow-hidden">
        {/* Watermark */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black text-obsessive-dim/5 rotate-[-45deg] pointer-events-none whitespace-nowrap">
          CONFIDENTIAL
        </div>

        <div className="relative z-10 space-y-6 text-obsessive-text/80 leading-relaxed font-mono">
          <p>
            <span className="text-obsessive-cyan font-bold">IDENTITY:</span>{" "}
            Known only by the alias "Matrixxboy". True identity remains{" "}
            <span className="bg-obsessive-text text-obsessive-text hover:bg-transparent hover:text-obsessive-accent transition-colors cursor-help select-none">
              [REDACTED]
            </span>
            .
          </p>

          <p>
            <span className="text-obsessive-cyan font-bold">ORIGIN:</span>{" "}
            Believed to operate out of{" "}
            <span className="bg-obsessive-text text-obsessive-text hover:bg-transparent hover:text-obsessive-accent transition-colors cursor-help select-none">
              [REDACTED SECTOR 7]
            </span>
            . No physical address on record.
          </p>

          <p>
            <span className="text-obsessive-cyan font-bold">OBJECTIVE:</span>{" "}
            The creation of Traitica was driven by a need to{" "}
            <span className="bg-obsessive-text text-obsessive-text hover:bg-transparent hover:text-obsessive-accent transition-colors cursor-help select-none">
              analyze human behavior patterns
            </span>{" "}
            and expose the underlying{" "}
            <span className="bg-obsessive-text text-obsessive-text hover:bg-transparent hover:text-obsessive-accent transition-colors cursor-help select-none">
              algorithmic nature of reality
            </span>
            .
          </p>

          <div className="my-8 border-l-2 border-obsessive-accent pl-4 italic text-obsessive-text/60">
            "The truth is not hidden. It is merely{" "}
            <span className="bg-obsessive-text text-obsessive-text hover:bg-transparent hover:text-obsessive-accent transition-colors cursor-help select-none">
              encrypted
            </span>
            ."
          </div>

          <p>
            <span className="text-obsessive-cyan font-bold">
              KNOWN ASSOCIATES:
            </span>
            <br />-{" "}
            <span className="bg-obsessive-text text-obsessive-text hover:bg-transparent hover:text-obsessive-accent transition-colors cursor-help select-none">
              [REDACTED]
            </span>
            <br />-{" "}
            <span className="bg-obsessive-text text-obsessive-text hover:bg-transparent hover:text-obsessive-accent transition-colors cursor-help select-none">
              [REDACTED]
            </span>
            <br />-{" "}
            <span className="bg-obsessive-text text-obsessive-text hover:bg-transparent hover:text-obsessive-accent transition-colors cursor-help select-none">
              [REDACTED]
            </span>
          </p>

          <div className="mt-12 pt-8 border-t border-obsessive-dim flex justify-between items-center">
            <div className="text-xs text-obsessive-text/40">
              DOC_ID: MXB-992-ALPHA
            </div>
            <button className="text-xs border border-obsessive-accent text-obsessive-accent px-4 py-2 hover:bg-obsessive-accent hover:text-black transition-colors uppercase tracking-wider">
              Report Sighting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creator;
