export const installNavigation = (slideClassName, slideShownClassName) => {
  let currentSlide = 0
  let totalSlides = document.querySelectorAll("body > ." + slideClassName).length
  let touchStartXY = null
  let minHorizontalSwipeDelta = Math.max(1, document.documentElement.clientWidth * 0.01)

  const hideSlide = n => {
    document.querySelectorAll("body > ." + slideClassName)[n].classList.remove(slideShownClassName)
  }

  const showSlide = n => {
    document.querySelectorAll("body > ." + slideClassName)[n].classList.add(slideShownClassName)
  }

  const showNextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      hideSlide(currentSlide)
      currentSlide += 1
      showSlide(currentSlide)
    }
  }

  const showPreviousSlide = () => {
    if (currentSlide > 0) {
      hideSlide(currentSlide)
      currentSlide -= 1
      showSlide(currentSlide)
    }
  }

  const showFirstSlide = () => {
    if (currentSlide !== 0) {
      hideSlide(currentSlide)
      currentSlide = 0
      showSlide(currentSlide)
    }
  }

  const showLastSlide = () => {
    let lastSlide = totalSlides - 1
    if (currentSlide !== lastSlide) {
      hideSlide(currentSlide)
      currentSlide = lastSlide
      showSlide(currentSlide)
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

  const onKeyDown = e => {
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

  const getTouchXY = e => {
    const touch = e.changedTouches[0]
    return [touch.clientX, touch.clientY]
  }

  const onTouchStart = e => {
    touchStartXY = getTouchXY(e)
  }

  const onTouchEnd = e => {
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
}
