# Changelog

This project adheres to [Semantic Versioning].

## [Unreleased]

## [v0.3.0] - 2021-02-08

### Added

* When doing a manual install of HTSD (`<script data-manual
  src="htsd.min.js">`), don't load styles automatically. Provide
  `window.htsd.installStyles` function to load styles manually. The
  `window.htsd.installAll` function will call it.

## [v0.2.0] - 2021-02-08

### Added

* Show and apply the current slide shown from the hash part of browser
  location.
* Generate id attributes for slides containing headers. This allows
  easier writing of slide specific CSS styles.

### Changed

* Make code block font-size smaller, have it available as CSS custom
  property.

## [v0.1.3] - 2020-10-15

### Changed

* Make asset bundle 0.5 KiB smaller by upgrading to webpack 5.

## [v0.1.2] - 2019-12-27

### Fixed

* Fix regression in v0.1.1: not full height content on html doc with
  doctype.

## [v0.1.1] - 2019-12-27

### Fixed

* Fix unnecessary vertical scrolling on Mobile Safari.

## [v0.1.0] - 2019-12-09

### Added

* First release.

[Semantic Versioning]: https://semver.org/spec/v2.0.0.html
[Unreleased]: https://github.com/tkareine/hackers-tiny-slide-deck/compare/v0.3.0...HEAD
[v0.3.0]: https://github.com/tkareine/hackers-tiny-slide-deck/compare/v0.2.0...v0.3.0
[v0.2.0]: https://github.com/tkareine/hackers-tiny-slide-deck/compare/v0.1.3...v0.2.0
[v0.1.3]: https://github.com/tkareine/hackers-tiny-slide-deck/compare/v0.1.2...v0.1.3
[v0.1.2]: https://github.com/tkareine/hackers-tiny-slide-deck/compare/v0.1.1...v0.1.2
[v0.1.1]: https://github.com/tkareine/hackers-tiny-slide-deck/compare/v0.1.0...v0.1.1
[v0.1.0]: https://github.com/tkareine/hackers-tiny-slide-deck/releases/tag/v0.1.0
