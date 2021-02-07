export const installNavigation = (slideClassName) => {
  const slideShownClassName = slideClassName + "--shown"

  let totalSlides = document.querySelectorAll("body > ." + slideClassName).length

  const parseSlideNumberFromLocation = () => Math.max(1, Math.min(totalSlides, Number(document.location.hash.slice(1))))

  let currentSlideIdx = parseSlideNumberFromLocation() - 1
  let touchStartXY = null
  let minHorizontalSwipeDelta = Math.max(1, document.documentElement.clientWidth * 0.01)

  const hideSlide = (idx) => {
    document.querySelectorAll("body > ." + slideClassName)[idx].classList.remove(slideShownClassName)
  }

  const showSlide = (idx) => {
    document.querySelectorAll("body > ." + slideClassName)[idx].classList.add(slideShownClassName)
    document.location.hash = "#" + (idx + 1)
  }

  showSlide(currentSlideIdx)

  const showNextSlide = () => {
    if (currentSlideIdx < totalSlides - 1) {
      hideSlide(currentSlideIdx)
      currentSlideIdx += 1
      showSlide(currentSlideIdx)
    }
  }

  const showPreviousSlide = () => {
    if (currentSlideIdx > 0) {
      hideSlide(currentSlideIdx)
      currentSlideIdx -= 1
      showSlide(currentSlideIdx)
    }
  }

  const showFirstSlide = () => {
    if (currentSlideIdx !== 0) {
      hideSlide(currentSlideIdx)
      currentSlideIdx = 0
      showSlide(currentSlideIdx)
    }
  }

  const showLastSlide = () => {
    let lastSlide = totalSlides - 1
    if (currentSlideIdx !== lastSlide) {
      hideSlide(currentSlideIdx)
      currentSlideIdx = lastSlide
      showSlide(currentSlideIdx)
    }
  }

  const toggleFullscreen = () => {
    if (document.fullscreenEnabled) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        document.querySelector("body").requestFullscreen()
      }
    }
  }

  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault()
        showNextSlide()
        break
      case "ArrowLeft":
        e.preventDefault()
        showPreviousSlide()
        break
      case "Home":
        e.preventDefault()
        showFirstSlide()
        break
      case "End":
        e.preventDefault()
        showLastSlide()
        break
      case "F":
        e.preventDefault()
        toggleFullscreen()
        break
    }
  }

  const getTouchXY = (e) => {
    const touch = e.changedTouches[0]
    return [touch.clientX, touch.clientY]
  }

  const onTouchStart = (e) => {
    touchStartXY = getTouchXY(e)
  }

  const onTouchEnd = (e) => {
    if (touchStartXY !== null) {
      const touchEndXY = getTouchXY(e)
      const dx = touchEndXY[0] - touchStartXY[0]
      const dy = touchEndXY[1] - touchStartXY[1]
      const absDx = Math.abs(dx)
      const absDy = Math.abs(dy)

      if (absDx > absDy && absDx > minHorizontalSwipeDelta) {
        if (dx > 0) {
          showPreviousSlide()
        } else {
          showNextSlide()
        }
      }

      resetTouch()
    }
  }

  const resetTouch = () => {
    touchStartXY = null
  }

  document.addEventListener("keydown", onKeyDown, false)
  document.addEventListener("touchstart", onTouchStart, false)
  document.addEventListener("touchend", onTouchEnd, false)
  document.addEventListener("touchcancel", resetTouch, false)

  const updateSlideShownUponHashChange = () => {
    const slideNum = parseSlideNumberFromLocation()
    const slideIdx = slideNum - 1
    document.location.hash = "#" + slideNum
    if (slideIdx !== currentSlideIdx) {
      hideSlide(currentSlideIdx)
      currentSlideIdx = slideIdx
      showSlide(currentSlideIdx)
    }
  }

  window.addEventListener("hashchange", updateSlideShownUponHashChange, false)
}
