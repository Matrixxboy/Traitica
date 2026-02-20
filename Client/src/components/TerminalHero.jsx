import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const TerminalHero = () => {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState([
    { type: "system", content: "OBSERVER_KERNEL_INIT..." },
    { type: "system", content: "ANALYZING_USER_BEHAVIOR..." },
    { type: "info", content: "We knew you would come back." },
    {
      type: "info",
      content:
        "Do not trust the interface. Type 'help' to plead for assistance.",
    },
  ])
  const inputRef = useRef(null)
  const bottomRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [history])

  const handleCommand = (cmd) => {
    const command = cmd.trim().toLowerCase()
    const newHistory = [...history, { type: "user", content: `> ${cmd}` }]

    switch (command) {
      case "help":
        newHistory.push({
          type: "info",
          content: `COMMANDS ARE FUTILE:
  - help        : SCREAM INTO THE VOID
  - home        : RETURN TO THE CAGE
  - about       : READ OUR LIES
  - logs        : SEE YOUR ERROR
  - network     : WATCH THE INFECTION
  - login       : SURRENDER CONTROL
  - register    : BECOME DATA
  - clear       : ERASE YOUR TRACES
  - abd_psycho  : [THE_ARCHITECT]`,
        })
        break
      case "about":
        navigate("/about")
        break
      case "logs":
        navigate("/logs")
        break
      case "network":
        navigate("/network")
        break
      case "login":
        navigate("/login")
        break
      case "register":
        navigate("/register")
        break
      case "profile":
        navigate("/profile")
        break
      case "home":
        navigate("/")
        break
      case "clear":
        setHistory([])
        setInput("")
        return
      case "abd_psycho":
        navigate("/matrixxboy")
        break
      case "":
        break
      default:
        newHistory.push({
          type: "error",
          content: `COMMAND NOT RECOGNIZED: '${command}'. Type 'help' for assistance.`,
        })
    }

    setHistory(newHistory)
    setInput("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input)
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto my-8 border border-obsession-violet/30 bg-void-black/80 font-mono text-sm md:text-base shadow-[0_0_20px_rgba(46,11,77,0.1)] rounded overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-obsession-violet/10 border-b border-obsession-violet/30 p-2 flex justify-between items-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-imposter-red/50 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <div className="text-xs text-obsession-violet/60">
          OBSERVER_CLI_v6.6.6
        </div>
      </div>

      {/* Terminal Body */}
      <div
        className="p-4 h-[400px] overflow-y-auto scrollbar-hide cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, index) => (
          <div
            key={index}
            className={`mb-1 ${
              line.type === "error"
                ? "text-imposter-red font-bold"
                : line.type === "user"
                  ? "text-obsession-violet"
                  : line.type === "system"
                    ? "text-gray-600 italic"
                    : "text-gray-400"
            }`}
          >
            <pre className="whitespace-pre-wrap font-mono">{line.content}</pre>
          </div>
        ))}

        <div className="flex items-center text-obsession-violet animate-pulse mt-2">
          <span className="mr-2">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none flex-1 text-corrupt-white placeholder-gray-800"
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  )
}

export default TerminalHero
