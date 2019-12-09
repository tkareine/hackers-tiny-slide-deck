# Hacker's Tiny Slide Deck (HTSD)

[![npm version](https://badge.fury.io/js/hackers-tiny-slide-deck.svg)][HTSD-npm-package]

Turn a Markdown document into a slide deck, in two steps:

1. Add a `<script>` tag linking the HTSD JavaScript bundle to the end of
   the Markdown document. For example, accessing the bundle from
   [jsDelivr] service:

   ``` html
   <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/hackers-tiny-slide-deck@VERSION/build/htsd.min.js"></script>
   ```

   (Replace `VERSION` with the version of this [npm
   package][HTSD-npm-package].)

2. Convert the Markdown document into html. For example, using [marked]:

   ``` shell
   marked -i example.md > example.html
   ```

This might be the preferable option for preparing a quick presentation.

Use an editor plugin to speed-up step 2, preferably via a keyboard
shortcut. For example, [markdown-mode] for Emacs has the
`markdown-export-and-preview` (`C-c C-c v`) command that can convert the
`.md` file in the current buffer to a `.html` file and open the html in
the default browser.

To demonstrate the features quickly, see the sources of [example.md] and
the converted [html][example.html].

## Features

* Responsive CSS, with automatically scaling text size.
* You can still adjust text size with the browser's zoom function.
* Keyboard shortcuts to change slides:
  * `⬅️` (left arrow) to show the previous slide
  * `➡️` (right arrow) to the next slide
  * `Home` to show the first slide
  * `End` to show the last slide
* Keyboard shortcut to toggle fullscreen, `Shift+F`.
* Swipe left and right gestures to change slides on mobile browsers.
* Built for modern browsers (no support for old browsers).
* Intentionally kept simple to allow easy hacking and customization. If
  you don't like something, download the source code and change it.
* Tiny, currently 11.5kb in size (bundled, minified).
* Printing the html document is unaffected; CSS styles are for screen
  media only.
* Might be one of the fastest ways to prepare a slide deck!

## Usage

Prepare a Markdown document, with a `<script>` tag linking to
`htsd.min.js`:

``` markdown
# Title

I'm the first slide.

---

## Topic 1

I'm the second slide.

---

# End

Thank you!

<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/hackers-tiny-slide-deck@VERSION/build/htsd.min.js"></script>
```

Where `VERSION` in the `src` attribute above refers to a version of this
[npm package][HTSD-npm-package].)

Convert the `.md` file prepared above to `.html`. Here, using [marked]:

``` shell
marked -i example.md > example.html
```

## Conventions to turn Markdown into slides

This section lists the special conventions to turn the content of html
generated from a Markdown document into slides.

### Horizontal separators (`<hr>`) separate slides

``` markdown
## Slide 1

---

## Slide 2

```

The contents of each slide get wrapped in a `<div>` tag, with style
class `htsd-slide`. Every slide will have that as the base class. In
addition, slides may have additional modifier classes; read below for
more.

You can utilize the base class (`htsd-slide`) and modifier classes
(`htsd-slide--modifier`) for custom styling.

### Contents of slides with `<h1>` get centered

``` markdown
# Title

I'm centered.
```

The modifier class used for centering is `htsd-slide--h1`.

### The highest header found in a slide gets injected into the class

``` markdown
# Title

---

## Topic
```

Here, the slide with `<h1>Title</h1>` will have the `htsd-slide--h1`
modifier class in addition to the `htsd-slide` base class. The slide
with `<h2>Topic</h2>` gets modifier class `htsd-slide--h2`.

## Customization

### Customize styles

Use a `<style media="screen">` tag to customize styles. There are custom
CSS properties to help your tuning needs:

``` css
@import url(https://fonts.googleapis.com/css?family=Roboto:400,400i,700);

/* override css custom properties */
:root {
  --htsd-sans-font-family: 'Roboto', sans-serif;
  --htsd-slide-bg-color: #f6f6f6;
  --htsd-header-color: #262626;
  --htsd-text-color: #1a1a1a;
}

/* override rules with selectors */
.htsd-slide em {
  font-weight: bold;
}
```

See the end of [example.md] for another example.

### Highlight syntax inside `<code>` tags

You can enable syntax highlighting inside `<code>` tags with an external
JavaScript library, such as [Prism.js].

See the end of [example.md] to see how to highlight code with Prism.js.

### Install HTSD manually

By default, loading `htsd.min.js` with the `<script>` tag automatically
installs the `<div>` tags for wrapping content into slides and
navigation keyboard shortcuts. If you want to install them manually, use
`data-manual` attribute in the `<script>` tag. For example:

``` html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/hackers-tiny-slide-deck@VERSION/build/htsd.min.js" data-manual></script>
```

HTSD provides the following object in `window`:

``` javascript
window.htsd = {
  // calls `installSlides`, `installNavigation`, and `markInstalled`
  installAll: () => undefined,

  // makes keyboard shortcuts available
  installNavigation: () => undefined,

  // wraps content into `<div class="htsd-slide">` tags, to be used as slides
  installSlides: () => undefined,

  // adds `htsd--installed` class to the `<body>` tag
  markInstalled: () => undefined,

  // contains HTSD version number
  version: string
}
```

Now, you can call `installAll` manually:

``` html
<script type="text/javascript">htsd.installAll()</script>
```

## License

MIT. See [LICENSE.txt].

[HTSD-npm-package]: https://www.npmjs.com/package/hackers-tiny-slide-deck
[LICENSE.txt]: https://raw.githubusercontent.com/tkareine/hackers-tiny-slide-deck/master/LICENSE.txt
[Prism.js]: https://prismjs.com/
[example.html]: https://tkareine.github.io/hackers-tiny-slide-deck/example.html
[example.md]: https://raw.githubusercontent.com/tkareine/hackers-tiny-slide-deck/master/example.md
[jsDelivr]: https://www.jsdelivr.com/
[markdown-mode]: https://jblevins.org/projects/markdown-mode/
[marked]: https://github.com/markedjs/marked
