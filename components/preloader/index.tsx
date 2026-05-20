"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"

import { useWindowSize } from "@/hooks/use-window-size"

import { opacity, PRELOADER_BG, slideUp } from "./animations"
import { cuisines } from "./words"

export function Preloader() {
  const [index, setIndex] = useState(0)
  const { width, height } = useWindowSize()

  useEffect(() => {
    if (index === cuisines.length - 1) return
    const timeout = setTimeout(
      () => setIndex((i) => i + 1),
      index === 0 ? 1000 : 150
    )
    return () => clearTimeout(timeout)
  }, [index])

  const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${
    height + 300
  } 0 ${height} L0 0`

  const targetPath = `M0 0 L${width} 0 L${width} ${height} Q${
    width / 2
  } ${height} 0 ${height} L0 0`

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
      d: targetPath,
      transition: {
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1] as const,
        delay: 0.3,
      },
    },
  }

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[99] flex h-screen w-screen items-center justify-center"
      style={{ backgroundColor: PRELOADER_BG }}
    >
      {width > 0 && (
        <>
          <motion.p
            variants={opacity}
            initial="initial"
            animate="enter"
            className="relative z-[1] flex items-center text-[42px] font-medium tracking-tight text-white"
          >
            <span
              aria-hidden
              className="mr-[10px] inline-block h-2.5 w-2.5 rounded-full bg-white"
            />
            {cuisines[index]}
          </motion.p>
          <svg
            aria-hidden
            className="absolute top-0 left-0 w-full"
            style={{ height: "calc(100% + 300px)" }}
          >
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
              fill={PRELOADER_BG}
            />
          </svg>
        </>
      )}
    </motion.div>
  )
}
