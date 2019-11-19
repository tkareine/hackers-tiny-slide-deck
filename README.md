# Hacker's Tiny Slide Deck

Turn a Markdown document into a slide deck, in two steps:

1. Add `<link>` and `<script>` tags linking this tool to the end of the
   Markdown document.

2. Convert the Markdown document into html.

This might be a preferable option for preparing a quick presentation.

Use an editor plugin to perform step 2, preferably via a keyboard
shortcut. For example, [markdown-mode] for Emacs has the
`markdown-export-and-preview` (`C-c C-c v`) command that can convert the
`.md` file in the current buffer to a `.html` file and open the html in
the default browser.

Alternatively, use a command line tool directly to convert your `.md`
file to `.html`. A good choice is [marked], for example.

To demonstrate the features quickly, see the sources of [example.md] and
the converted [html][example.html].

## Features

* Responsive css, with automatically scaling text size.
* You can adjust text size with the browser's zoom function.
* Keyboard shortcuts to change slides, `←` (left arrow) and `→` (right
  arrow).
* Keyboard shortcut to toggle fullscreen, `shift+f`.
* Built for modern browsers.
* Intentionally kept simple to allow easy hacking and customization. If
  you don't like something, download the source code and change it.
* Might be one of the fastest ways to prepare a slide deck!

## Usage

Prepare a Markdown document, with `<link>` and `<script>` tags linking
to `htsd.min.css` and `htsd.min.js`, respectively:

``` markdown
# Title

I'm the first slide.

---

## Topic 1

I'm the second slide.

---

# End

Thank you!

<link rel="stylesheet" media="screen" href="https://tkareine.github.io/hackers-tiny-slide-deck/htsd.min.css" />
<script type="text/javascript" src="https://tkareine.github.io/hackers-tiny-slide-deck/htsd.min.js"></script>
```

Convert the `.md` file prepared above to `.html`. Here, using `marked`:

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

The contents of each slide get wrapped in a `<div>` tag, with css class
`htsd-slide`. Every slide will have that as the base class. In addition,
slides may have additional modifier classes; read below for more.

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

### Customization

To customize styles, use a `<style>` tag after importing `htsd.min.css`
with `<link>`. There's custom css properties to help your tuning needs:

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

You can enable syntax highlighting inside `<code>` tags with an external
JavaScript library, such as [Prism.js].

See the end of [example.md] to see how to highlight code with Prism.js.

## License

MIT. See [LICENSE.txt].

[LICENSE.txt]: https://raw.githubusercontent.com/tkareine/hackers-tiny-slide-deck/master/LICENSE.txt
[Prism.js]: https://prismjs.com/
[example.md]: https://raw.githubusercontent.com/tkareine/hackers-tiny-slide-deck/master/example.md
[example.html]: https://tkareine.github.io/hackers-tiny-slide-deck/example.html
[markdown-mode]: https://jblevins.org/projects/markdown-mode/
[marked]: https://github.com/markedjs/marked
