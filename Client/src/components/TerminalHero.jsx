import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TerminalHero = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "system", content: "INITIALIZING TRAITICA KERNEL..." },
    {
      type: "system",
      content: "LOADING MODULES: BEHAVIOR_ANALYSIS, PATTERN_RECOGNITION...",
    },
    { type: "system", content: "SYSTEM READY." },
    {
      type: "info",
      content: "Welcome to Traitica. Type 'help' for available commands.",
    },
  ]);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  const handleCommand = (cmd) => {
    const command = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: "user", content: `> ${cmd}` }];

    switch (command) {
      case "help":
        newHistory.push({
          type: "info",
          content: `AVAILABLE COMMANDS:
  - help        : Show this message
  - about       : Mission statement
  - login       : Access secure terminal
  - register    : Create new entity
  - clear       : Clear terminal
  - matrixxboy  : [REDACTED]`,
        });
        break;
      case "about":
        navigate("/about");
        break;
      case "login":
        navigate("/login");
        break;
      case "register":
        navigate("/register");
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "matrixxboy":
        navigate("/matrixxboy");
        break;
      case "":
        break;
      default:
        newHistory.push({
          type: "error",
          content: `COMMAND NOT RECOGNIZED: '${command}'. Type 'help' for assistance.`,
        });
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 border border-obsessive-dim bg-obsessive-black/80 font-mono text-sm md:text-base shadow-[0_0_20px_rgba(0,255,255,0.05)] rounded overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-obsessive-dim/20 border-b border-obsessive-dim p-2 flex justify-between items-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <div className="text-xs text-obsessive-text/40">
          TRAITICA_CLI_v2.0.4
        </div>
      </div>

      {/* Terminal Body */}
      <div
        className="p-4 h-[400px] overflow-y-auto scrollbar-hide"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, index) => (
          <div
            key={index}
            className={`mb-1 ${
              line.type === "error"
                ? "text-red-500"
                : line.type === "user"
                ? "text-obsessive-cyan"
                : line.type === "system"
                ? "text-obsessive-text/60 italic"
                : "text-obsessive-text"
            }`}
          >
            <pre className="whitespace-pre-wrap font-mono">{line.content}</pre>
          </div>
        ))}

        <div className="flex items-center text-obsessive-cyan animate-pulse-fast mt-2">
          <span className="mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none flex-1 text-obsessive-text placeholder-obsessive-text/30"
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default TerminalHero;
