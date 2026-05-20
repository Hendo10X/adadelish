"use client"

import Link from "next/link"
import { motion } from "motion/react"

import { indicatorScale, linkSlide } from "./animations"

const inter = "var(--font-sans), system-ui, sans-serif"

type Props = {
  data: { title: string; href: string; index: number }
  isActive: boolean
  setSelectedIndicator: (href: string) => void
  onNavigate: () => void
}

export function NavLink({
  data,
  isActive,
  setSelectedIndicator,
  onNavigate,
}: Props) {
  const { title, href, index } = data

  return (
    <motion.div
      className="relative flex items-center"
      onMouseEnter={() => setSelectedIndicator(href)}
      custom={index}
      variants={linkSlide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={indicatorScale}
        animate={isActive ? "open" : "closed"}
        className="absolute -left-7 h-2.5 w-2.5 rounded-full bg-white"
      />
      <Link
        href={href}
        onClick={onNavigate}
        className="text-[44px] leading-[1.05] font-light tracking-[-0.01em] text-white no-underline"
        style={{ fontFamily: inter }}
      >
        {title}
      </Link>
    </motion.div>
  )
}
