"use client"

import { useEffect, useState } from "react"
import { AnimatePresence } from "motion/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLenis } from "lenis/react"

import { Features } from "@/components/features"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { MobileMenu } from "@/components/mobile-menu"
import { Navbar } from "@/components/navbar"
import { NextSection } from "@/components/next-section"
import { Places } from "@/components/places"
import { Preloader } from "@/components/preloader"
import { Story } from "@/components/story"
import { Testimonials } from "@/components/testimonials"

const PRELOADER_DURATION_MS = 2500

const SCROLL_HIDE_THRESHOLD = 10

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
  const [preloaderDone, setPreloaderDone] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)

  useLenis(({ scroll }: { scroll: number }) => {
    setIsAtTop(scroll < SCROLL_HIDE_THRESHOLD)
  })

  useEffect(() => {
    document.body.style.cursor = "wait"

    const timeout = setTimeout(() => {
      setIsLoading(false)
      document.body.style.cursor = "default"
      window.scrollTo(0, 0)
    }, PRELOADER_DURATION_MS)

    return () => clearTimeout(timeout)
  }, [])

  // Once the preloader fully exits, the layout can shift; let ScrollTrigger
  // recompute pin start/end positions against the final layout.
  useEffect(() => {
    if (!preloaderDone) return
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(raf)
  }, [preloaderDone])

  return (
    <>
      <main className="relative z-10 mb-[100svh] bg-white">
        <AnimatePresence
          mode="wait"
          onExitComplete={() => setPreloaderDone(true)}
        >
          {isLoading && <Preloader />}
        </AnimatePresence>

        <Navbar visible={preloaderDone && isAtTop} />
        <MobileMenu visible={preloaderDone} />
        <Hero />
        <NextSection />
        <Marquee />
        <Features />
        <Story />
        <Places />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
