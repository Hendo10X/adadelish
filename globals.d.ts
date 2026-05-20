// Ambient type declarations for non-JS/TS assets that Next.js handles at
// build time but TypeScript doesn't know about by default.

declare module "*.css"
declare module "*.scss"
declare module "*.sass"

declare module "*.module.css" {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module "*.svg" {
  const content: string
  export default content
}
