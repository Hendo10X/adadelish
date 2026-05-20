"use client"

import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { PlayPauseButton } from "./play-pause-button"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const frame = frameRef.current
    const card = cardRef.current
    if (!section || !frame || !card) return

    const ctx = gsap.context(() => {
      // Stage 1 — pin the hero and grow the video to full bleed.
      const expand = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      })

      expand
        .to(
          frame,
          {
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            ease: "none",
          },
          0
        )
        .to(card, { borderRadius: 0, ease: "none" }, 0)

      // Stage 2 — parallax reveal of the next section as it scrolls in.
      const nextContent = document.querySelector<HTMLElement>(
        ".js-next-section-content"
      )
      const nextSection = document.querySelector<HTMLElement>(
        ".js-next-section"
      )

      if (nextContent && nextSection) {
        gsap.from(nextContent, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: nextSection,
            start: "top bottom",
            end: "top center",
            scrub: 0.6,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const handleToggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      void v.play()
      setIsPlaying(true)
    } else {
      v.pause()
      setIsPlaying(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative z-0 h-svh w-full overflow-hidden bg-white"
    >
      <div ref={frameRef} className="absolute inset-0 px-3 pt-20 pb-3 md:px-6 md:pt-24 md:pb-6">
        <div
          ref={cardRef}
          className="relative h-full w-full overflow-hidden"
          style={{ borderRadius: "28px" }}
        >
          <video
            ref={videoRef}
            src="/videos/restaurant.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
          <PlayPauseButton isPlaying={isPlaying} onToggle={handleToggle} />
        </div>
      </div>
    </section>
  )
}
