import test from "ava"
import { slug } from "../slug.mjs"

const testSlug = test.macro({
  exec: (t, inputStr, expected) => {
    t.is(slug(inputStr), expected)
  },
  title: (providedTitle = "", inputStr, expected) => `${providedTitle} slug(${inputStr}) = ${expected}`.trim(),
})

test(testSlug, "Hacker's Tiny Slide Deck", "hacker-s-tiny-slide-deck")
test(testSlug, " \t a1 →\nöä\tBc 9D\n", "a1------bc-9d")
