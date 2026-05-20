"use client"

import { useEffect, useState } from "react"
import { AnimatePresence } from "motion/react"

import { Burger } from "./burger"
import { Menu } from "./menu"

export function MobileMenu({ visible = true }: { visible?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)

  // Force-close the panel any time the surrounding gate is off, without
  // syncing state in an effect — derive at render.
  const effectiveOpen = visible && isOpen

  // Lock body scroll while the menu is open.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = effectiveOpen ? "hidden" : prev
    return () => {
      document.body.style.overflow = prev
    }
  }, [effectiveOpen])

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!effectiveOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [effectiveOpen])

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className="md:hidden"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 300ms ease-out",
      }}
    >
      <Burger
        isOpen={effectiveOpen}
        onToggle={() => setIsOpen((o) => !o)}
      />
      <AnimatePresence mode="wait">
        {effectiveOpen && <Menu onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}
