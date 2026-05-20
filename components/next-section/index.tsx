"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { aboutCopy, hoursLines } from "./content"
import { splitIntoLines } from "./split-lines"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const BRAND = "#FF3207"
const inter = "var(--font-sans), system-ui, sans-serif"

export function NextSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const hoursRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const about = aboutRef.current
    const hours = hoursRef.current
    if (!section || !about || !hours) return

    // Split the about copy into one masked line per visual line.
    const aboutLines = splitIntoLines(about, aboutCopy)
    const hoursItems = Array.from(
      hours.querySelectorAll<HTMLElement>(".js-hours-line")
    )

    const ctx = gsap.context(() => {
      gsap.set([...aboutLines, ...hoursItems], { yPercent: 110 })

      gsap.to(aboutLines, {
        yPercent: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: about,
          start: "top 80%",
          once: true,
        },
      })

      gsap.to(hoursItems, {
        yPercent: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: hours,
          start: "top 80%",
          once: true,
        },
      })
    })

    // Re-split + reset on resize so line wrapping stays in sync.
    const onResize = () => {
      const fresh = splitIntoLines(about, aboutCopy)
      gsap.set(fresh, { yPercent: 0 })
      ScrollTrigger.refresh()
    }
    let resizeTimer: ReturnType<typeof setTimeout>
    const debouncedResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(onResize, 200)
    }
    window.addEventListener("resize", debouncedResize)

    return () => {
      window.removeEventListener("resize", debouncedResize)
      clearTimeout(resizeTimer)
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="js-next-section relative w-full bg-white px-6 py-20 md:px-16 md:py-40"
    >
      <div className="js-next-section-content mx-auto flex w-full max-w-[1280px] flex-col gap-12 md:grid md:grid-cols-12 md:gap-10">
        <div
          ref={aboutRef}
          className="text-[20px] leading-[1.3] md:col-span-7 md:text-[28px] md:leading-[1.25]"
          style={{
            color: BRAND,
            fontFamily: inter,
            fontWeight: 600,
          }}
        >
          {/* SSR fallback; replaced on mount by splitIntoLines. */}
          {aboutCopy}
        </div>

        <div
          ref={hoursRef}
          className="text-[18px] leading-[1.45] md:col-span-4 md:col-start-9 md:text-[24px] md:leading-[1.4]"
          style={{
            color: BRAND,
            fontFamily: inter,
            fontWeight: 500,
          }}
        >
          {hoursLines.map((line) => (
            <div key={line} className="overflow-hidden">
              <div className="js-hours-line">{line}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
