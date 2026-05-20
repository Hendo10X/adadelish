"use client"

import { useRef } from "react"
import gsap from "gsap"

const obviously = "var(--font-obviously), system-ui, sans-serif"
const BRAND = "#FF3207"
const BRAND_LETTERS = ["a", "d", "a", "d", "e", "l", "i", "s", "h"]

export function Footer() {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])

  const handleEnter = (i: number) => {
    const el = lettersRef.current[i]
    if (!el) return
    gsap.killTweensOf(el)
    gsap
      .timeline()
      .to(el, { rotate: 14, duration: 0.12, ease: "power2.out" })
      .to(el, { rotate: -9, duration: 0.12, ease: "power2.inOut" })
      .to(el, { rotate: 5, duration: 0.12, ease: "power2.inOut" })
      .to(el, { rotate: -2, duration: 0.12, ease: "power2.inOut" })
      .to(el, { rotate: 0, duration: 0.18, ease: "power2.out" })
  }

  return (
    <footer
      aria-label="Site footer"
      className="fixed inset-x-0 bottom-0 z-0 flex h-svh flex-col text-white"
      style={{ backgroundColor: BRAND }}
    >
      {/* Top — address + contact */}
      <div className="flex flex-col gap-10 px-8 pt-14 md:flex-row md:items-start md:justify-between md:px-16 md:pt-20">
        <div className="flex flex-col gap-1.5 text-[15px]">
          <p className="text-[11px] tracking-[0.22em] uppercase opacity-70">
            Visit
          </p>
          <p>123 Bank Street</p>
          <p>Ottawa, Ontario K1P 5N7</p>
        </div>
        <div className="flex flex-col gap-1.5 text-[15px]">
          <p className="text-[11px] tracking-[0.22em] uppercase opacity-70">
            Contact
          </p>
          <p>hello@adadelish.com</p>
          <p>(613) 555-0142</p>
        </div>
        <div className="flex flex-col gap-1.5 text-[15px]">
          <p className="text-[11px] tracking-[0.22em] uppercase opacity-70">
            Hours
          </p>
          <p>Thu – Sun: 11 – 9</p>
          <p>Mon – Wed: Closed</p>
        </div>
      </div>

      {/* Middle — huge wobbling wordmark */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4">
        <div className="flex select-none items-end leading-none">
          {BRAND_LETTERS.map((letter, i) => (
            <span
              key={`${letter}-${i}`}
              ref={(el) => {
                lettersRef.current[i] = el
              }}
              onMouseEnter={() => handleEnter(i)}
              className="inline-block cursor-default text-[16vw] leading-[0.85] md:text-[19vw]"
              style={{
                fontFamily: obviously,
                transformOrigin: "50% 80%",
                willChange: "transform",
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom — meta line */}
      <div className="flex flex-col items-start justify-between gap-2 px-8 pb-8 text-[12px] tracking-[0.04em] md:flex-row md:items-center md:px-16 md:pb-10">
        <p>© {new Date().getFullYear()} Adadelish</p>
        <p>Crafted with love in Ottawa</p>
        <p className="opacity-70">All rights reserved</p>
      </div>
    </footer>
  )
}
