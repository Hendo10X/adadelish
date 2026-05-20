"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { usePathname } from "next/navigation"

import { menuSlide } from "./animations"
import { Curve } from "./curve"
import { MENU_BG, navItems } from "./links"
import { NavLink } from "./nav-link"

type Props = {
  onClose: () => void
}

export function Menu({ onClose }: Props) {
  const pathname = usePathname()
  const [selectedIndicator, setSelectedIndicator] = useState(pathname)

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed top-0 right-0 z-[105] flex h-svh w-full flex-col justify-between box-border p-12 text-white"
      style={{ backgroundColor: MENU_BG }}
    >
      <div
        onMouseLeave={() => setSelectedIndicator(pathname)}
        className="mt-20 flex flex-col gap-3"
      >
        <div className="mb-10 border-b border-white/20 pb-2 text-[11px] tracking-[0.25em] text-white/50 uppercase">
          Navigation
        </div>
        {navItems.map((item, i) => (
          <NavLink
            key={item.href}
            data={{ ...item, index: i }}
            isActive={selectedIndicator === item.href}
            setSelectedIndicator={setSelectedIndicator}
            onNavigate={onClose}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 text-[12px] text-white/80">
        <a href="#" className="transition hover:text-white">
          Instagram
        </a>
        <a href="#" className="transition hover:text-white">
          Twitter
        </a>
        <a href="#" className="transition hover:text-white">
          TikTok
        </a>
        <a href="#" className="transition hover:text-white">
          LinkedIn
        </a>
      </div>

      <Curve />
    </motion.div>
  )
}
