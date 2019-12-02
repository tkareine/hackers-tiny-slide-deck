/** Hacker's Tiny Slide Deck
 *  @author Tuomas Kareinen
 *  @license MIT
 */
import "./htsd.css"

const version = "0.0.2-head.2"
const classNS = "htsd"
const slideClassName = classNS + "-slide"
const slideShownClassName = slideClassName + "--shown"

import { installSlides as mkSlides } from "./slides"
const installSlides = mkSlides.bind(undefined, slideClassName, slideShownClassName)

import { installNavigation as mkNavigation } from "./navigation"
const installNavigation = mkNavigation.bind(undefined, slideClassName, slideShownClassName)

const markInstalled = () => {
  document.querySelector("body").classList.add(classNS + "--installed")
}

const installAll = () => {
  installSlides()
  installNavigation()
  markInstalled()
}

;(function autoInstall() {
  if (!document.currentScript.hasAttribute("data-manual")) {
    installAll()
  }
})()

window.htsd = Object.freeze({
  installAll,
  installNavigation,
  installSlides,
  markInstalled,
  version
})
