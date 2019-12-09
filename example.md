# Hacker's Tiny Slide Deck

## (Or HTSD in short)

### A feature demonstration

Press ➡️ (right arrow) to go to the next slide.

_9th Dec 2019_

---

## Keyboard shortcuts

⬅️ (left arrow) or _swipe left gesture_ to show the previous slide

➡️ (right arrow) or _swipe right gesture_ to show the next slide

`Home` to show the first slide

`End` to show the last slide

`Shift+F` to toggle fullscreen

---

## Code snippet

An implementation in JavaScript to calculate the [Fibonacci number], to
demonstrate syntax highlighting with [Prism.js]:

``` javascript
/* iterative implementation */
function fibonacci(n) {
  let a = 1
  let b = 0
  let temp

  while (n >= 0) {
    temp = a
    a = a + b
    b = temp
    n -= 1
  }

  return b
}
```

(You might have to scroll to reach here, and that's intentional.)

---

## Usage

1. Prepare a Markdown document, like for the [example][example.md]
   you're looking at. Separate content between intended slides with
   `---` (three dashes, these become as `<hr>` tags in the html
   conversion).

2. Add `<link>` and `<script>` tags linking HTSD CSS and JavaScript
   files to the end of the Markdown document.

3. Convert the Markdown document into html. For example, try the
   [marked] tool.

---

## How it works

HTSD looks for `<hr>` tags in the html conversion of the Markdown
document, and wraps the contents between the `<hr>`s into `<div>`
tags. CSS styles turn these `<div>`s into slides.

Then, HTDS installs keyboard shortcuts for navigation.

---

## Customization

See the bottom of the [Markdown source][example.md] of this slide deck
and the [README].

Being tiny, you can easily hack the implementation for your own needs!

---

# End

Thank you!

The code is available at GitHub:<br>
[hackers-tiny-slide-deck]

[Fibonacci number]: https://en.wikipedia.org/wiki/Fibonacci_number
[Prism.js]: https://prismjs.com/
[README]: https://github.com/tkareine/hackers-tiny-slide-deck/blob/master/README.md
[example.md]: https://raw.githubusercontent.com/tkareine/hackers-tiny-slide-deck/master/example.md
[hackers-tiny-slide-deck]: https://github.com/tkareine/hackers-tiny-slide-deck/
[marked]: https://github.com/markedjs/marked

<style type="text/css" media="screen">
@import url(https://fonts.googleapis.com/css?family=Roboto:400,400i,700|Roboto+Mono:400,700);
:root {
  --htsd-sans-font-family: 'Roboto', sans-serif;
  --htsd-mono-font-family: 'Roboto Mono', monospace;
}
</style>
<script type="text/javascript" src="htsd.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/prism.min.js"></script>
