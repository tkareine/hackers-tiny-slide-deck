import test from "ava"
import { slug } from "../slug.mjs"

test("slug", (t) => {
  t.is(slug("Hacker's Tiny Slide Deck"), "hacker-s-tiny-slide-deck")
  t.is(slug(" \t a1 →\nöä\tBc 9D\n"), "a1------bc-9d")
})
