"use client"

import { motion } from "motion/react"

import { useWindowSize } from "@/hooks/use-window-size"

import { MENU_BG } from "./links"

/**
 * Curved SVG that hangs off the left edge of the menu, peeling outward
 * on enter / exit. Uses the same easing curve language as the preloader.
 */
export function Curve() {
  const { height } = useWindowSize()
  if (height === 0) return null

  const initialPath = `M100 0 L100 ${height} Q-100 ${height / 2} 100 0`
  const targetPath = `M100 0 L100 ${height} Q100 ${height / 2} 100 0`

  const curve = {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
    },
  }

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute top-0 h-full w-[100px]"
      style={{ left: "-99px", fill: MENU_BG, stroke: "none" }}
    >
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      />
    </svg>
  )
}
