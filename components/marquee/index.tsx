"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

import { marqueeWords } from "./words"

const BRAND = "#FF3207"
const obviously = "var(--font-obviously), system-ui, sans-serif"
const CYCLE_SECONDS = 22

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  // Double the list so we can translate by exactly one set's width
  // and the second copy sits in the same place — seamless wrap.
  const items = [...marqueeWords, ...marqueeWords]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let tween: gsap.core.Tween | null = null

    const start = () => {
      tween?.kill()
      gsap.set(track, { x: 0 })
      const setWidth = track.scrollWidth / 2
      tween = gsap.to(track, {
        x: -setWidth,
        duration: CYCLE_SECONDS,
        ease: "none",
        repeat: -1,
      })
    }

    start()

    // Recompute on resize so the wrap stays pixel-perfect.
    let raf = 0
    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(start)
    }
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(raf)
      tween?.kill()
    }
  }, [])

  return (
    <section
      aria-label="Restaurant descriptors marquee"
      className="relative w-full overflow-hidden select-none"
      style={{ backgroundColor: BRAND }}
    >
      <div
        ref={trackRef}
        className="flex w-max items-center"
        style={{ willChange: "transform" }}
      >
        {items.map((word, i) => (
          <span
            key={`${word}-${i}`}
            aria-hidden={i >= marqueeWords.length}
            className="flex shrink-0 items-center pr-16 text-[64px] leading-none tracking-[-0.01em] text-white uppercase md:text-[88px]"
            style={{ fontFamily: obviously, paddingBlock: "0.45em" }}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  )
}
