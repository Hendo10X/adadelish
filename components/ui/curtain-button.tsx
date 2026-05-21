import { cn } from "@/lib/utils"

const BRAND = "#FF3207"
const obviously = "var(--font-obviously), system-ui, sans-serif"

type Variant = "solid" | "outline"

type CurtainButtonProps = {
  href?: string
  className?: string
  children: React.ReactNode
  variant?: Variant
}

/**
 * Pill button with a curtain that peels up from below on hover.
 *
 *  - "solid"   → brand-orange fill, white label, BLACK curtain rises
 *  - "outline" → brand-orange border, brand-orange label, ORANGE curtain
 *                fills the pill and label flips to white
 */
export function CurtainButton({
  href = "#",
  className,
  children,
  variant = "solid",
}: CurtainButtonProps) {
  const isOutline = variant === "outline"

  return (
    <a
      href={href}
      style={{
        backgroundColor: isOutline ? "transparent" : BRAND,
        borderColor: isOutline ? BRAND : undefined,
        fontFamily: obviously,
        WebkitTapHighlightColor: "transparent",
      }}
      className={cn(
        "group/curtain relative inline-flex appearance-none items-center justify-center overflow-hidden rounded-full px-6 py-2.5 text-[14px] tracking-[0.04em] uppercase no-underline outline-none ring-0 transition-transform duration-200 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:scale-[0.96]",
        isOutline ? "border-[1.5px]" : "border-0",
        className
      )}
    >
      <span
        aria-hidden
        style={{
          backgroundColor: isOutline ? BRAND : "#000",
          height: "calc(100% + 14px)",
          borderTopLeftRadius: "50%",
          borderTopRightRadius: "50%",
        }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 translate-y-full transition-transform duration-550 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/curtain:translate-y-0"
      />
      <span
        className={cn(
          "relative z-10 transition-colors duration-450 ease-[cubic-bezier(0.76,0,0.24,1)]",
          isOutline
            ? "text-brand group-hover/curtain:text-white"
            : "text-white"
        )}
      >
        {children}
      </span>
    </a>
  )
}
