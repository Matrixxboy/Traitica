import React from "react";
import { useParams, Link } from "react-router-dom";

const ArchiveDetail = () => {
  const { id } = useParams();

  // Mock data - in a real app, fetch based on ID
  const doc = {
    id: id,
    title: "THE_NUMEROLOGICAL_CONSTANT",
    date: "2025-11-01",
    author: "MATRIXXBOY",
    content: `
      <p>The recurrence of the number 23 in historical tragedies suggests a non-random distribution of chaotic events.</p>
      <br/>
      <p><strong>CASE STUDY 1:</strong> The Titanic sank on April 15, 1912 (1+5+4+1+9+1+2 = 23).</p>
      <p><strong>CASE STUDY 2:</strong> The Hiroshima bomb was dropped at 8:15 (8+15 = 23).</p>
      <br/>
      <p>Is this mere coincidence, or evidence of a programmed reality? Our analysis suggests the latter. The universe operates on a mathematical framework that we are only beginning to understand.</p>
      <br/>
      <p class="text-obsessive-accent">CONCLUSION: REALITY IS SCRIPTED.</p>
    `,
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <Link
          to="/archives"
          className="text-xs text-obsessive-text/40 hover:text-obsessive-cyan mb-4 block"
        >
          &lt; RETURN_TO_INDEX
        </Link>
        <div className="border border-obsessive-dim p-8 bg-obsessive-black/60 relative">
          {/* Paper texture overlay effect */}
          <div className="absolute inset-0 bg-white opacity-[0.02] pointer-events-none mix-blend-overlay"></div>

          <div className="flex justify-between items-start border-b border-obsessive-dim pb-6 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {doc.title}
              </h1>
              <div className="flex gap-4 text-xs text-obsessive-text/50 font-mono">
                <span>ID: {doc.id}</span>
                <span>DATE: {doc.date}</span>
                <span>AUTHOR: {doc.author}</span>
              </div>
            </div>
            <div className="w-16 h-16 border-2 border-obsessive-dim rounded-full flex items-center justify-center opacity-50 rotate-12">
              <span className="text-[10px] font-bold text-obsessive-dim uppercase transform -rotate-12">
                DECLASSIFIED
              </span>
            </div>
          </div>

          <div
            className="prose prose-invert prose-sm md:prose-base max-w-none font-mono text-obsessive-text/80 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: doc.content }}
          />

          <div className="mt-12 pt-6 border-t border-obsessive-dim flex justify-between items-center text-xs text-obsessive-text/40">
            <span>END_OF_FILE</span>
            <span>SEC_LEVEL: 5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveDetail;
