"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ReactLenis, useLenis } from "lenis/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Bridges Lenis smooth scroll into GSAP ScrollTrigger so pinning,
 * scrubs, and scroll-driven timelines stay in sync.
 */
function ScrollTriggerBridge() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const update = () => ScrollTrigger.update()
    lenis.on("scroll", update)

    return () => {
      lenis.off("scroll", update)
    }
  }, [lenis])

  return null
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      <ScrollTriggerBridge />
      {children}
    </ReactLenis>
  )
}
