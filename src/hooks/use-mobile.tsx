"use client"

import { useEffect, useState } from "react"

export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Define a media query that checks if the screen width is <= breakpoint
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`)

    // Update the state on mount
    setIsMobile(mediaQuery.matches)

    // Listener for changes
    const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches)
    mediaQuery.addEventListener("change", handler)

    return () => mediaQuery.removeEventListener("change", handler)
  }, [breakpoint])

  return isMobile
}
