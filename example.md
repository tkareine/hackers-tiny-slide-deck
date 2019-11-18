# Hacker's Tiny Slide Deck

## A demonstration

Use `←` (left arrow) and `→` (right arrow) to change slides, `shift+f`
to toggle fullscreen.

_18.11.2019_

---

## The purpose

* Show bullets (this slide)
* Show code snippet (next slide)
* Show end slide, centered (last slide)

## Code snippet

Some JavaScript code to demonstrate syntax highlighting:

### The code

``` javascript
/* comment 1 */
const mkSlide = () => {
  const slideEl = document.createElement("div")
  slideEl.className = slideClassName  // NOTE: beware
  nextSlideContentEls.forEach(e => {
    bodyEl.removeChild(e)
    slideEl.appendChild(e)
  })
  nextSlideContentEls = []
  return slideEl
}
```

---

## Customization

See the bottom of the Markdown source of this slide deck.

---

This is the second last slide. Go see the end already!

---

# End

Thank you!

<link rel="stylesheet" href="https://tkareine.github.io/hackers-tiny-slide-deck/htsd.min.css" />
<style type="text/css">
@import url(https://fonts.googleapis.com/css?family=Roboto:400,400i,700|Roboto+Mono:400,700);
:root {
  --htsd-sans-font-family: 'Roboto', sans-serif;
  --htsd-mono-font-family: 'Roboto Mono', monospace;
}
</style>
<script type="text/javascript" src="https://tkareine.github.io/hackers-tiny-slide-deck/htsd.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/prism.min.js"></script>
