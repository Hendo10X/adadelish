import { Geist_Mono, Inter } from "next/font/google"
import localFont from "next/font/local"

import "./globals.css"
import { LenisProvider } from "@/components/providers/lenis-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const obviously = localFont({
  src: "../public/fonts/ObviouslyDemo-NarrowBlack.otf",
  variable: "--font-obviously",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        obviously.variable
      )}
    >
      <body>
        <ThemeProvider>
          <LenisProvider>{children}</LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
