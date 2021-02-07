import test from "ava"
import { slug } from "../slug.mjs"

test("slug", (t) => {
  t.is(slug("Hacker's Tiny Slide Deck"), "hacker-s-tiny-slide-deck")
  t.is(slug(" \t a →\nöä\tBc D\n"), "a------bc-d")
})
