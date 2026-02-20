import React, { useState, useEffect } from "react"

const RedactedText = ({ text = "CLASSIFIED", placeholder = "[REDACTED]" }) => {
  const [display, setDisplay] = useState(placeholder)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    let interval
    if (isHovering) {
      let iteration = 0
      interval = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index]
              }
              return "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"[
                Math.floor(Math.random() * 26)
              ]
            })
            .join(""),
        )
        iteration += 1 / 3

        if (iteration >= text.length) {
          clearInterval(interval)
        }
      }, 30)
    } else {
      setDisplay(placeholder)
    }

    return () => clearInterval(interval)
  }, [isHovering, text, placeholder])

  return (
    <span
      className="inline-block bg-obsession-violet text-black px-1 mx-1 cursor-help font-mono font-bold select-none hover:bg-transparent hover:text-obsession-violet transition-colors border border-obsession-violet"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {display}
    </span>
  )
}

export default RedactedText
