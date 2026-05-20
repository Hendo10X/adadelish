export type Feature = {
  id: string
  titleLines: [string, string]
  description: string
  cta: string
  image: string
  imageAlt: string
  titlePosition: "top" | "bottom"
}

export const features: Feature[] = [
  {
    id: "african-goodness",
    titleLines: ["African", "Goodness"],
    description:
      "Authentic Nigerian flavors built on traditional spices, slow-cooked stocks, and the quiet patience of recipes passed down generations.",
    cta: "Taste Our Menu",
    image: "/images/Colorful Food Bowl.png",
    imageAlt: "Bowl of meat, rice, peppers and greens",
    titlePosition: "bottom",
  },
  {
    id: "superior-outlets",
    titleLines: ["Superior", "Outlets"],
    description:
      "Each location is a vibrant space where Nigerian heritage meets contemporary design — built for gathering, sharing, lingering.",
    cta: "Find a Location",
    image: "/images/superior.jpg",
    imageAlt: "Storefront with warm yellow facade",
    titlePosition: "bottom",
  },
  {
    id: "varieties-of-food",
    titleLines: ["Varieties", "of Food"],
    description:
      "From jollof bowls to suya burgers, our menu spans the full breadth of West African staples reimagined for modern palates.",
    cta: "Explore Dishes",
    image: "/images/foodvariety.jpg",
    imageAlt: "Spread of various African dishes on a blue table",
    titlePosition: "top",
  },
]
