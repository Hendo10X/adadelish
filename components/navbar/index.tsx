import { CurtainButton } from "@/components/ui/curtain-button"

import { navLinks } from "./links"

const obviously = "var(--font-obviously), system-ui, sans-serif"
const BRAND = "#FF3207"

export function Navbar({ visible = true }: { visible?: boolean }) {
  return (
    <header
      aria-hidden={!visible}
      inert={!visible}
      className="fixed inset-x-0 top-0 z-[100] isolate transition-opacity duration-300 ease-out"
      style={{
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="flex items-center justify-between bg-white/95 px-6 py-3 backdrop-blur-md md:grid md:grid-cols-3 md:px-8">
        <a
          href="#"
          aria-label="adadelish home"
          className="text-[36px] leading-none tracking-[-0.01em] lowercase select-none md:justify-self-start md:text-[28px]"
          style={{
            fontFamily: obviously,
            color: BRAND,
          }}
        >
          adadelish
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-medium tracking-[0.04em] text-neutral-900 uppercase md:flex md:justify-self-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-opacity duration-200 hover:opacity-60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <CurtainButton
          href="#contact"
          className="hidden md:inline-flex md:justify-self-end"
        >
          Contact Us
        </CurtainButton>
      </div>
    </header>
  )
}
