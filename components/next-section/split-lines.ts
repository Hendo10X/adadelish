/**
 * Splits the text content of `container` into one DOM line per visual line.
 *
 * For each visual line it produces:
 *   <span class="line-mask">     // overflow: hidden
 *     <span class="line-inner">  // the element you animate (translateY)
 *       …words…
 *     </span>
 *   </span>
 *
 * Returns the array of line-inner elements (the things you'll tween).
 */
export function splitIntoLines(
  container: HTMLElement,
  text: string
): HTMLElement[] {
  // 1. Stamp each word into its own inline-block span so offsetTop is reliable.
  const tokens = text.split(/\s+/).filter(Boolean)
  container.innerHTML = tokens
    .map((word) => `<span class="js-word" style="display:inline-block">${word}</span>`)
    .join(" ")

  const wordEls = Array.from(
    container.querySelectorAll<HTMLElement>(".js-word")
  )

  // 2. Group words sharing the same offsetTop into the same visual line.
  const lines: string[][] = []
  let lineTop = Number.NaN
  let bucket: string[] = []

  for (const el of wordEls) {
    const top = el.offsetTop
    if (top !== lineTop) {
      if (bucket.length) lines.push(bucket)
      bucket = []
      lineTop = top
    }
    bucket.push(el.textContent ?? "")
  }
  if (bucket.length) lines.push(bucket)

  // 3. Replace the flat word soup with mask/inner pairs per line.
  container.innerHTML = ""
  const inners: HTMLElement[] = []

  for (const words of lines) {
    const mask = document.createElement("span")
    mask.style.display = "block"
    mask.style.overflow = "hidden"

    const inner = document.createElement("span")
    inner.style.display = "block"
    inner.style.willChange = "transform"
    inner.textContent = words.join(" ")

    mask.appendChild(inner)
    container.appendChild(mask)
    inners.push(inner)
  }

  return inners
}
