"use client"

import { useLayoutEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { CurtainButton } from "@/components/ui/curtain-button"

import { story } from "./copy"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const obviously = "var(--font-obviously), system-ui, sans-serif"
const BRAND = "#FF3207"

export function Story() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingLinesRef = useRef<(HTMLSpanElement | null)[]>([])
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      })

      const headingLines = headingLinesRef.current.filter(
        (n): n is HTMLSpanElement => n !== null
      )

      tl.from(
        imageRef.current,
        {
          xPercent: 8,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
        },
        0
      )
        .from(
          headingLines,
          {
            yPercent: 110,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.1,
          },
          0.05
        )
        .from(
          bodyRef.current,
          {
            y: 24,
            opacity: 0,
            duration: 0.9,
            ease: "expo.out",
          },
          "-=0.6"
        )
        .from(
          buttonRef.current,
          {
            y: 16,
            opacity: 0,
            duration: 0.8,
            ease: "expo.out",
          },
          "-=0.5"
        )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Our story"
      className="relative w-full bg-white px-6 py-24 md:px-16 md:py-32"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-12 md:flex-row md:items-center md:gap-20">
        <div className="w-full md:flex-1">
          <h2
            className="text-[40px] leading-[1.1] font-black tracking-[0] uppercase md:text-[72px]"
            style={{ color: BRAND, fontFamily: obviously }}
          >
            {story.heading.map((line, i) => (
              <span
                key={line}
                className="block overflow-hidden"
                style={{ paddingBottom: "0.12em" }}
              >
                <span
                  ref={(el) => {
                    headingLinesRef.current[i] = el
                  }}
                  className="block"
                  style={{ willChange: "transform" }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h2>

          <p
            ref={bodyRef}
            className="mt-9 max-w-[480px] text-[17px] leading-[1.55] text-neutral-900 md:text-[19px]"
          >
            {story.body}
          </p>

          <div ref={buttonRef} className="mt-10">
            <CurtainButton variant="outline">{story.cta}</CurtainButton>
          </div>
        </div>

        <div
          ref={imageRef}
          className="w-full shrink-0 md:w-[440px] lg:w-[520px]"
        >
          <div
            className="overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]"
            style={{ transform: "rotate(2deg)" }}
          >
            <Image
              src="/images/chef.jpg"
              alt="Portrait of Chef Tunde Adesola"
              width={520}
              height={620}
              sizes="(min-width: 1024px) 520px, (min-width: 768px) 440px, 100vw"
              className="h-auto w-full object-cover"
              style={{ filter: "grayscale(1) contrast(1.05)" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
