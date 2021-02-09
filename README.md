# Hacker's Tiny Slide Deck (HTSD)

[![npm version](https://badge.fury.io/js/hackers-tiny-slide-deck.svg)][HTSD-npm-package]
[![CI](https://github.com/tkareine/hackers-tiny-slide-deck/workflows/CI/badge.svg)][HTSD-CI]

Turn a Markdown document into a slide deck, in two steps:

1. Add a `<script>` tag referring the HTSD JavaScript bundle to the end
   of the Markdown document. For example, accessing the bundle from
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

Use an editor plugin to make step 2 easier, preferably via a keyboard
shortcut. For example, [markdown-mode] for Emacs has the
`markdown-export-and-preview` (`C-c C-c v`) command, which converts the
`.md` file in the current buffer to a `.html` file and opens the html in
the default browser.

To demonstrate the features quickly, see the sources of [example.md] and
the converted [html][example.html].

## Features

* Responsive CSS, with automatically scaling text size.
* You can still adjust text size with the browser's zoom function.
* Keyboard shortcuts to change slides:
  * ⬅️ (left arrow) to show the previous slide
  * ➡️ (right arrow) to show the next slide
  * `Home` to show the first slide
  * `End` to show the last slide
* Keyboard shortcut to toggle fullscreen, `Shift+F`.
* Swipe left and right gestures to change slides on mobile browsers.
* Built for modern browsers (no support for old browsers).
* Support browser history, remember current slide shown on reload.
* Easy slide specific CSS styles with id attributes generated from
  headers.
* Intentionally kept simple to allow easy hacking and customization. If
  you don't like something, download the source code and change it.
* Tiny, currently 11.6 KiB in size (bundled, minified, not compressed).
* Printing the html document is unaffected; CSS styles are for screen
  media only.
* Might be one of the fastest ways to prepare a slide deck!

## Usage

Prepare a Markdown document, with a `<script>` tag referring
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

Where `VERSION` in the `<script>`'s `src` attribute refers to a version
of this [npm package][HTSD-npm-package].)

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
addition, slides may have additional modifier classes and id attributes;
read below for more.

You can utilize the base class (`htsd-slide`) for styling global to all
slides.

### Modifier class for the highest level header in a slide

``` markdown
# Title

## Topic 1

I'm centered.

---

## Topic 2

I'm not centered.
```

Here, the slide with `<h1>Title</h1>` will have the `htsd-slide--h1`
modifier class in addition to the `htsd-slide` base class. HTSD includes
CSS styles to center the content having the `htsd-slide--h1` class.

The slide with `<h2>Topic 2</h2>` gets `htsd-slide--h2` as the modifier
class. HTSD has no special CSS styles for header levels below level 2,
but you can add them yourself.

### Id attribute for the highest level header in a slide

The text contents of the highest level header in each slide is used to
generate the id attributes for them. You can use this in the CSS
selectors to customize styles (see [example.md]).

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

See the end of [example.md] for more examples.

### Syntax highlighting inside `<code>` tags

You can enable syntax highlighting inside `<code>` tags with an external
JavaScript library, such as [Prism.js].

See the end of [example.md] to see how to highlight code with Prism.js.

### Install HTSD manually

By default, loading `htsd.min.js` with the `<script>` tag automatically
installs all features. If you want to install features manually, use the
`data-manual` attribute in the `<script>` tag. For example:

``` html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/hackers-tiny-slide-deck@VERSION/build/htsd.min.js" data-manual></script>
```

HTSD provides the following object in `window`:

``` javascript
window.htsd = {
  // calls, in order:
  //
  // 1. installStyles
  // 2. installSlides
  // 3. installNavigation
  // 4. markInstalled
  installAll: () => undefined,

  // apply CSS styles by injecting a <style> tag into <head>
  installStyles: () => undefined,

  // wrap content into <div class="htsd-slide"> tags, to be used as slides
  installSlides: () => undefined,

  // 1. enable handling the hash part of browser location
  // 2. show the selected slide
  // 3. make keyboard shortcuts and swipe gestures available
  installNavigation: () => undefined,

  // add `htsd--installed` class to the <body> tag
  markInstalled: () => undefined,

  // contains HTSD version number
  version: string
}
```

Now, you can call `installAll` manually:

``` html
<script type="text/javascript">htsd.installAll()</script>
```

Calling the `install*` or `markInstalled` functions more than once leads
to undefined behavior. The implementation is simpler without attempting
to handle the complexities in different call combinations.

## License

MIT. See [LICENSE.txt].

[HTSD-CI]: https://github.com/tkareine/hackers-tiny-slide-deck/actions?workflow=CI
[HTSD-npm-package]: https://www.npmjs.com/package/hackers-tiny-slide-deck
[LICENSE.txt]: https://raw.githubusercontent.com/tkareine/hackers-tiny-slide-deck/master/LICENSE.txt
[Prism.js]: https://prismjs.com/
[example.html]: https://tkareine.github.io/hackers-tiny-slide-deck/example.html
[example.md]: https://raw.githubusercontent.com/tkareine/hackers-tiny-slide-deck/master/example.md
[jsDelivr]: https://www.jsdelivr.com/
[markdown-mode]: https://jblevins.org/projects/markdown-mode/
[marked]: https://github.com/markedjs/marked
