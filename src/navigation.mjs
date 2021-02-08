const replaceLocationHash = (newHash) => {
  const url = new URL(document.location.href)
  url.hash = newHash
  history.replaceState(null, "", url.href)
}

export const installNavigation = (slideClassName) => {
  const slideShownClassName = slideClassName + "--shown"

  const totalSlides = document.querySelectorAll("body > ." + slideClassName).length

  const minHorizontalSwipeDelta = Math.max(1, document.documentElement.clientWidth * 0.01)

  const parseSlideNumberFromHash = (hash) => Math.max(1, Math.min(totalSlides, Number(hash.slice(1))))

  const hideSlide = (idx) => {
    document.querySelectorAll("body > ." + slideClassName)[idx].classList.remove(slideShownClassName)
  }

  const showSlide = (idx) => {
    document.querySelectorAll("body > ." + slideClassName)[idx].classList.add(slideShownClassName)
  }

  const startingSlideNum = parseSlideNumberFromHash(document.location.hash)

  const correctStartingHash = "#" + startingSlideNum

  if (document.location.hash !== correctStartingHash) {
    replaceLocationHash(correctStartingHash)
  }

  let currentSlideIdx = startingSlideNum - 1

  showSlide(currentSlideIdx)

  const changeSlideTo = (idx) => {
    hideSlide(currentSlideIdx)
    currentSlideIdx = idx
    showSlide(currentSlideIdx)
    document.location.hash = "#" + (idx + 1)
  }

  const changeToNextSlide = () => {
    if (currentSlideIdx < totalSlides - 1) {
      changeSlideTo(currentSlideIdx + 1)
    }
  }

  const changeToPreviousSlide = () => {
    if (currentSlideIdx > 0) {
      changeSlideTo(currentSlideIdx - 1)
    }
  }

  const changeToFirstSlide = () => {
    if (currentSlideIdx !== 0) {
      changeSlideTo(0)
    }
  }

  const changeToLastSlide = () => {
    let lastSlide = totalSlides - 1
    if (currentSlideIdx !== lastSlide) {
      changeSlideTo(lastSlide)
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
        changeToNextSlide()
        break
      case "ArrowLeft":
        e.preventDefault()
        changeToPreviousSlide()
        break
      case "Home":
        e.preventDefault()
        changeToFirstSlide()
        break
      case "End":
        e.preventDefault()
        changeToLastSlide()
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

  let touchStartXY = null

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
          changeToPreviousSlide()
        } else {
          changeToNextSlide()
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

  const onHashChange = () => {
    const givenHash = document.location.hash
    const givenSlideNum = parseSlideNumberFromHash(givenHash)
    const correctHash = "#" + givenSlideNum
    const givenSlideIdx = givenSlideNum - 1

    if (givenHash !== correctHash) {
      replaceLocationHash(correctHash)
    }

    if (givenSlideIdx !== currentSlideIdx) {
      changeSlideTo(givenSlideIdx)
    }
  }

  window.addEventListener("hashchange", onHashChange, false)
}
