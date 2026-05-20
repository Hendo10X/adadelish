"use client"

import { useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { CurtainButton } from "@/components/ui/curtain-button"

import type { Feature } from "./data"

const obviously = "var(--font-obviously), system-ui, sans-serif"

export function FeatureCard({ feature }: { feature: Feature }) {
  const [hovered, setHovered] = useState(false)

  const isTopTitle = feature.titlePosition === "top"

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{
        flexGrow: hovered ? 2.5 : 1,
        transition: "flex-grow 700ms cubic-bezier(0.76, 0, 0.24, 1)",
      }}
      className="group relative basis-0 min-h-[420px] overflow-hidden rounded-3xl md:min-h-[600px]"
    >
      <Image
        src={feature.image}
        alt={feature.imageAlt}
        fill
        priority={false}
        sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      />

      {/* Contrast wash so the title stays legible */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 bg-gradient-to-b",
          isTopTitle
            ? "from-black/55 via-black/15 to-black/35"
            : "from-black/15 via-black/15 to-black/55"
        )}
      />

      <div
        className={cn(
          "absolute inset-0 flex flex-col gap-5 p-8 md:p-10",
          isTopTitle ? "justify-start" : "justify-end"
        )}
      >
        <h3
          className="text-[36px] leading-[1.02] font-black tracking-[0] text-white uppercase md:text-[54px]"
          style={{ fontFamily: obviously }}
        >
          {feature.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>

        {/* Expanded details — fade + lift on hover */}
        <div
          aria-hidden={!hovered}
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0px)" : "translateY(12px)",
            transition:
              "opacity 500ms ease-out 220ms, transform 500ms ease-out 220ms",
          }}
          className="max-w-[420px] text-white"
        >
          <p className="text-[15px] leading-[1.5] md:text-[16px]">
            {feature.description}
          </p>
          <div className="mt-5">
            <CurtainButton>{feature.cta}</CurtainButton>
          </div>
        </div>
      </div>
    </div>
  )
}
