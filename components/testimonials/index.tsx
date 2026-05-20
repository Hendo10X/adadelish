"use client"

import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { testimonials } from "./data"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const obviously = "var(--font-obviously), system-ui, sans-serif"
const BRAND = "#FF3207"

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const progress = progressRef.current
    if (!section || !track || !progress) return

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Snap progress bar + active index from scroll progress.
            progress.style.transform = `scaleX(${self.progress})`
            const next = Math.min(
              testimonials.length - 1,
              Math.floor(self.progress * testimonials.length + 0.0001)
            )
            setActiveIndex(next)
          },
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const padded = String(activeIndex + 1).padStart(2, "0")
  const total = String(testimonials.length).padStart(2, "0")

  return (
    <section
      ref={sectionRef}
      aria-label="What people are saying"
      className="relative h-svh w-full overflow-hidden bg-neutral-950 text-white"
    >
      {/* Counter (top right) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-end px-6 pt-10 md:px-16 md:pt-12">
        <div className="flex items-baseline gap-2 font-mono text-[12px] tracking-[0.1em] tabular-nums text-white/70">
          <span className="text-white">{padded}</span>
          <span>/</span>
          <span>{total}</span>
        </div>
      </div>

      {/* Horizontal slider track */}
      <div
        ref={trackRef}
        className="flex h-full items-center"
        style={{ willChange: "transform" }}
      >
        {testimonials.map((t, i) => (
          <article
            key={t.name}
            aria-label={`Testimonial from ${t.name}`}
            className="flex h-full w-screen shrink-0 items-center px-6 md:px-32"
          >
            <div className="max-w-[1100px]">
              <span
                aria-hidden
                className="block text-[80px] leading-[0.6] md:text-[180px]"
                style={{ color: BRAND, fontFamily: obviously }}
              >
                &ldquo;
              </span>

              <p className="mt-2 text-[22px] leading-[1.25] font-medium tracking-[-0.01em] text-white md:text-[52px] md:leading-[1.2]">
                {t.quote}
              </p>

              <div className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <span
                  className="text-[14px] tracking-[0.15em] uppercase md:text-[16px]"
                  style={{ color: BRAND, fontFamily: obviously }}
                >
                  — {t.name}
                </span>
                <span className="text-[13px] text-white/60 md:text-[14px]">
                  {t.role}
                </span>
                <span className="ml-auto font-mono text-[12px] tracking-[0.1em] text-white/40 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Progress bar at the bottom */}
      <div className="absolute inset-x-0 bottom-0 z-20 h-[3px] bg-white/10">
        <div
          ref={progressRef}
          className="h-full origin-left bg-white"
          style={{ transform: "scaleX(0)", backgroundColor: BRAND }}
        />
      </div>
    </section>
  )
}
