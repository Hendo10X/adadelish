"use client"

import { cn } from "@/lib/utils"

const BRAND = "#FF3207"

type Props = {
  isOpen: boolean
  onToggle: () => void
}

export function Burger({ isOpen, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className="fixed top-5 right-5 z-[110] grid h-14 w-14 cursor-pointer place-items-center rounded-full outline-none focus-visible:outline-none active:scale-[0.95]"
      style={{ backgroundColor: BRAND }}
    >
      <span className="relative block h-3 w-6">
        <span
          className={cn(
            "absolute right-0 left-0 h-[1.5px] bg-white transition-all duration-300 ease-out",
            isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
          )}
        />
        <span
          className={cn(
            "absolute right-0 left-0 h-[1.5px] bg-white transition-all duration-300 ease-out",
            isOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
          )}
        />
      </span>
    </button>
  )
}
