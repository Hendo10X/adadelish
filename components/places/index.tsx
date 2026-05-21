"use client"

import { useRef } from "react"
import gsap from "gsap"

import { places } from "./data"

const obviously = "var(--font-obviously), system-ui, sans-serif"
const inter = "var(--font-sans), system-ui, sans-serif"
const BRAND = "#FF3207"

export function Places() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  const handleEnter = (i: number) => {
    const el = itemsRef.current[i]
    if (!el) return
    gsap.to(el, {
      top: "-2vw",
      backgroundColor: places[i].color,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleLeave = (i: number) => {
    const el = itemsRef.current[i]
    if (!el) return
    gsap.to(el, {
      top: "0",
      backgroundColor: "#ffffff",
      duration: 0.3,
      delay: 0.1,
      ease: "power2.out",
    })
  }

  return (
    <section
      aria-label="Locations across Ottawa"
      className="relative w-full bg-white py-24 md:py-32"
    >
      <div className="mb-12 px-6 md:mb-20 md:px-16">
        <h2
          className="text-[36px] leading-[1.05] font-black tracking-[-0.005em] uppercase md:text-[72px]"
          style={{ color: BRAND, fontFamily: obviously }}
        >
          Places in Ottawa
          <br />
          We Are
        </h2>
      </div>

      <div className="relative w-full">
        {places.map((place, i) => (
          <div
            key={place.name}
            ref={(el) => {
              itemsRef.current[i] = el
            }}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
            className="relative -mb-[2vw] cursor-pointer border-t border-black bg-white"
          >
            <p
              className="pointer-events-none m-0 px-6 py-2 text-[8vw] leading-[1.05] uppercase md:px-16 md:text-[5vw]"
              style={{
                fontFamily: inter,
                fontWeight: 700,
                color: "#000",
              }}
            >
              {place.name}
            </p>
          </div>
        ))}
        {/* Final border so the last row has a closed bottom edge */}
        <div className="border-t border-black" />
      </div>
    </section>
  )
}
