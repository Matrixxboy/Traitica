import React from "react"

const NetworkStatus = () => {
  const nodes = [
    {
      id: "NODE_ALPHA",
      location: "NORTH_AMERICA_RELAY",
      status: "ONLINE",
      ping: "24ms",
    },
    {
      id: "NODE_BETA",
      location: "EUROPE_CENTRAL",
      status: "COMPROMISED",
      ping: "---",
    },
    {
      id: "NODE_GAMMA",
      location: "ASIA_PACIFIC",
      status: "OFFLINE",
      ping: "0ms",
    },
    {
      id: "NODE_DELTA",
      location: "DEEP_MIND_CORE",
      status: "UNKNOWN",
      ping: "999ms",
    },
    {
      id: "NODE_EPSILON",
      location: "[REDACTED]",
      status: "LISTENING",
      ping: "12ms",
    },
    {
      id: "NODE_ZETA",
      location: "ANTARCTICA_WINTER",
      status: "ONLINE",
      ping: "145ms",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-mono font-bold text-white mb-8 border-b border-gray-800 pb-4">
        GLOBAL_NETWORK_STATUS
      </h1>

      <div className="grid grid-cols-1 gap-4">
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`border p-4 font-mono text-sm flex justify-between items-center transition-all hover:scale-[1.01] ${
              node.status === "COMPROMISED"
                ? "border-imposter-red bg-imposter-red/10 animate-pulse text-red-500"
                : "border-gray-800 bg-black/50 text-gray-400 hover:border-gray-600"
            }`}
          >
            <div>
              <div className="font-bold text-lg mb-1">{node.id}</div>
              <div className="text-xs opacity-60">{node.location}</div>
            </div>

            <div className="text-right">
              <div
                className={`font-bold ${
                  node.status === "ONLINE"
                    ? "text-green-500"
                    : node.status === "COMPROMISED"
                      ? "text-red-500"
                      : "text-yellow-500"
                }`}
              >
                {node.status}
              </div>
              <div className="text-xs opacity-50">LATENCY: {node.ping}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 border border-imposter-red/50 bg-black text-imposter-red font-mono text-xs">
        <p>WARNING: MULTIPLE NODES REPORTING INTEGRITY FAILURES.</p>
        <p>DO NOT ATTEMPT TO REBOOT MANUALLY. CONTACT ADMIN.</p>
      </div>
    </div>
  )
}

export default NetworkStatus
