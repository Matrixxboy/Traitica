import React, { useState, useEffect, useRef } from "react"

const SystemLogs = () => {
  const [logs, setLogs] = useState([])
  const bottomRef = useRef(null)

  useEffect(() => {
    const generateLog = () => {
      const timestamp = new Date().toISOString()
      const levels = ["INFO", "WARN", "ERROR", "CRITICAL"]
      const messages = [
        "Packet lost in sector 7",
        "Encrypted data stream detected",
        "Unauthorized access attempt blocked",
        "Kernel panic: memory corruption at 0x004F3A",
        "Diverting power to auxiliary core",
        "User 992-ALPHA attempting login...",
        "Firewall breach detected on port 8080",
        "Downloading manifest_v2.dat...",
        "Scanning for biometric match...",
        "[REDACTED] protocol initiated",
      ]

      const level = levels[Math.floor(Math.random() * levels.length)]
      const msg = messages[Math.floor(Math.random() * messages.length)]

      return `[${timestamp}] [${level}] ${msg} ${level === "CRITICAL" ? "!!! SYSTEM FAILURE !!!" : ""}`
    }

    const interval = setInterval(() => {
      setLogs((prev) => {
        const newLogs = [...prev, generateLog()]
        if (newLogs.length > 50) newLogs.shift() // Keep buffer small
        return newLogs
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [logs])

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 h-screen flex flex-col">
      <h1 className="text-3xl font-mono font-bold text-imposter-red mb-4 animate-pulse">
        SYSTEM_LOGS_VIEWER_v0.1
      </h1>
      <div className="flex-1 bg-black border border-gray-800 p-4 font-mono text-xs md:text-sm overflow-hidden relative">
        <div className="absolute inset-0 bg-imposter-red/5 pointer-events-none z-10"></div>
        <div className="h-full overflow-y-auto scrollbar-hide space-y-1">
          {logs.map((log, i) => {
            const isError = log.includes("ERROR") || log.includes("CRITICAL")
            return (
              <div
                key={i}
                className={`${isError ? "text-imposter-red font-bold" : "text-gray-500"}`}
              >
                {log}
              </div>
            )
          })}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  )
}

export default SystemLogs
