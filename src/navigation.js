export const installNavigation = (slideClassName, slideShownClassName) => {
  let currentSlide = 0
  let totalSlides = document.querySelectorAll("body > ." + slideClassName).length

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

  document.addEventListener("keydown", e => {
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
        toggleFullscreen()
        break
    }
  })
}
