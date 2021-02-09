/** Hacker's Tiny Slide Deck
 *  @author Tuomas Kareinen <tkareine@gmail.com>
 *  @license MIT
 */
const manualInstallAttributeName = "data-manual"

import styles from "./htsd.lazy.css"

const installStyles = () => {
  styles.use()
}

if (!document.currentScript.hasAttribute(manualInstallAttributeName)) {
  installStyles() // apply styles as fast as possible
}

const version = process.env.npm_package_version
const classNS = "htsd"
const slideClassName = classNS + "-slide"

import { installSlides as mkSlides } from "./slides.mjs"
const installSlides = mkSlides.bind(undefined, slideClassName)

import { installNavigation as mkNavigation } from "./navigation.mjs"
const installNavigation = mkNavigation.bind(undefined, slideClassName)

const markInstalled = () => {
  document.querySelector("body").classList.add(classNS + "--installed")
}

if (!document.currentScript.hasAttribute(manualInstallAttributeName)) {
  installSlides()
  installNavigation()
  markInstalled()
}

window.htsd = Object.freeze({
  installAll: () => {
    installStyles()
    installSlides()
    installNavigation()
    markInstalled()
  },
  installStyles,
  installSlides,
  installNavigation,
  markInstalled,
  version,
})
