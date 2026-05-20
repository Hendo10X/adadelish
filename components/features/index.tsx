import { features } from "./data"
import { FeatureCard } from "./feature-card"

export function Features() {
  return (
    <section
      aria-label="What makes Adadelish special"
      className="relative w-full bg-white px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 md:flex-row md:gap-5">
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  )
}
