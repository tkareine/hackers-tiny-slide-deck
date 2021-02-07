export const installSlides = (slideClassName) => {
  const skipTagsFromSlides = ["script", "style"]
  const headerRegex = /^h(\d)$/i
  const bodyEl = document.querySelector("body")

  const slideEls = []
  let nextSlideContentEls = []

  const mkSlide = () => {
    const slideEl = document.createElement("div")
    slideEl.className = slideClassName
    let lowestHeaderFound = null

    nextSlideContentEls.forEach((e) => {
      const headerMatch = headerRegex.exec(e.tagName)
      if (headerMatch && (lowestHeaderFound === null || headerMatch[1] < lowestHeaderFound)) {
        lowestHeaderFound = Number(headerMatch[1])
      }
      bodyEl.removeChild(e)
      slideEl.appendChild(e)
    })

    nextSlideContentEls = []

    if (lowestHeaderFound) {
      slideEl.classList.add(`${slideClassName}--h${lowestHeaderFound}`)
    }

    return slideEl
  }

  let el = bodyEl.firstChild

  while (el != null) {
    const nextEl = el.nextSibling

    if (el.tagName) {
      const tag = el.tagName.toLowerCase()

      if (tag === "hr") {
        bodyEl.removeChild(el)
        if (nextSlideContentEls.length) {
          slideEls.push(mkSlide())
        }
      } else if (!skipTagsFromSlides.includes(tag)) {
        nextSlideContentEls.push(el)
      }
    } else {
      nextSlideContentEls.push(el)
    }

    el = nextEl
  }

  if (nextSlideContentEls.length) {
    slideEls.push(mkSlide())
  }

  slideEls.forEach((e) => bodyEl.appendChild(e))
}
