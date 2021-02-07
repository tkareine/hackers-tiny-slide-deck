/** Hacker's Tiny Slide Deck
 *  @author Tuomas Kareinen <tkareine@gmail.com>
 *  @license MIT
 */
import "./htsd.css"

const version = process.env.npm_package_version
const classNS = "htsd"
const slideClassName = classNS + "-slide"

import { installSlides as mkSlides } from "./slides"
const installSlides = mkSlides.bind(undefined, slideClassName)

import { installNavigation as mkNavigation } from "./navigation"
const installNavigation = mkNavigation.bind(undefined, slideClassName)

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
  version,
})
