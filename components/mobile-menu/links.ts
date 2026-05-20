export const navItems = [
  { title: "Home", href: "#" },
  { title: "Our Menu", href: "#features" },
  { title: "Our Story", href: "#story" },
  { title: "Locations", href: "#places" },
  { title: "Reviews", href: "#testimonials" },
  { title: "Contact", href: "#contact" },
] as const

export type NavItem = (typeof navItems)[number]

export const MENU_BG = "rgb(20, 20, 20)"
