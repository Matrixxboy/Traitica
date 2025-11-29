import React from "react";
import { Link } from "react-router-dom";

const archives = [
  {
    id: "DOC-001",
    title: "THE_NUMEROLOGICAL_CONSTANT",
    date: "2025-11-01",
    clearance: "PUBLIC",
    desc: "Investigating the recurrence of the number 23 in historical tragedies.",
  },
  {
    id: "DOC-002",
    title: "BLOOD_TYPE_PERSONALITY_MATRIX",
    date: "2025-11-15",
    clearance: "RESTRICTED",
    desc: "Correlation between Rh-null blood and high-functioning sociopathy.",
  },
  {
    id: "DOC-003",
    title: "THE_JULIAN_CALENDAR_SHIFT",
    date: "2025-11-20",
    clearance: "PUBLIC",
    desc: "Did we lose 300 years of history? Analyzing the phantom time hypothesis.",
  },
  {
    id: "DOC-004",
    title: "PROJECT_MK_ULTRA_REVISITED",
    date: "2025-11-25",
    clearance: "TOP_SECRET",
    desc: "[REDACTED] [REDACTED] control mechanisms in modern media.",
  },
];

const Archives = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="border-b border-obsessive-dim pb-4 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-widest text-white mb-2">
            CLASSIFIED_ARCHIVES
          </h1>
          <p className="text-xs text-obsessive-text/50">
            DECLASSIFIED DOCUMENTS // PUBLIC ACCESS TERMINAL
          </p>
        </div>
        <div className="text-right text-xs text-obsessive-text/50">
          <p>TOTAL_RECORDS: {archives.length}</p>
          <p>LAST_UPDATE: {new Date().toISOString().split("T")[0]}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {archives.map((doc) => (
          <div
            key={doc.id}
            className={`border border-obsessive-dim p-6 transition-all duration-300 ${
              doc.clearance === "TOP_SECRET"
                ? "bg-red-900/10 border-red-900/30 opacity-70"
                : "bg-obsessive-black/40 hover:bg-obsessive-dim/10 hover:border-obsessive-cyan"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-mono text-obsessive-text/40">
                {doc.id} // {doc.date}
              </span>
              <span
                className={`text-[10px] px-2 py-1 border ${
                  doc.clearance === "PUBLIC"
                    ? "border-green-500/50 text-green-500"
                    : doc.clearance === "RESTRICTED"
                    ? "border-yellow-500/50 text-yellow-500"
                    : "border-red-500/50 text-red-500"
                }`}
              >
                {doc.clearance}
              </span>
            </div>

            <h3 className="text-xl font-bold mb-2 text-white">{doc.title}</h3>
            <p className="text-sm text-obsessive-text/60 mb-4 font-mono">
              {doc.desc}
            </p>

            {doc.clearance !== "TOP_SECRET" ? (
              <Link
                to={`/archives/${doc.id}`}
                className="text-xs text-obsessive-accent hover:text-obsessive-cyan uppercase tracking-wider"
              >
                [ VIEW_DOCUMENT ]
              </Link>
            ) : (
              <span className="text-xs text-red-500/50 cursor-not-allowed uppercase tracking-wider">
                [ ACCESS_DENIED ]
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archives;
