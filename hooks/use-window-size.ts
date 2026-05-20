"use client"

import { useSyncExternalStore } from "react"

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback)
  return () => window.removeEventListener("resize", callback)
}

function getSnapshot() {
  return `${window.innerWidth}x${window.innerHeight}`
}

function getServerSnapshot() {
  return "0x0"
}

export function useWindowSize() {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [width, height] = snap.split("x").map(Number)
  return { width, height }
}
