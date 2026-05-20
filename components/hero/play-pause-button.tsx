"use client"

import { Pause, Play } from "lucide-react"

type Props = {
  isPlaying: boolean
  onToggle: () => void
}

export function PlayPauseButton({ isPlaying, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? "Pause video" : "Play video"}
      className="group absolute right-8 bottom-8 z-10 grid h-14 w-14 place-items-center rounded-full bg-brand/30 text-white ring-1 ring-white/15 backdrop-blur-md transition-colors duration-200 hover:bg-brand/60 focus-visible:bg-brand/60 focus-visible:outline-none"
    >
      <span className="grid h-5 w-5 place-items-center transition-transform duration-150 group-active:scale-90">
        {isPlaying ? (
          <Pause className="h-5 w-5" fill="currentColor" strokeWidth={0} />
        ) : (
          <Play
            className="h-5 w-5 translate-x-[2px]"
            fill="currentColor"
            strokeWidth={0}
          />
        )}
      </span>
    </button>
  )
}
