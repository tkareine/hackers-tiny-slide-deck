import test from "ava"
import { parseIntInRange } from "../parsing.mjs"

test("parseIntInRange", (t) => {
  const f = parseIntInRange.bind(undefined, 2, 6)

  t.is(f("0"), 2)
  t.is(f("1"), 2)
  t.is(f("2"), 2)
  t.is(f("3"), 3)
  t.is(f("5"), 5)
  t.is(f("6"), 6)
  t.is(f("7"), 6)
  t.is(f("-1"), 2)
  t.is(f("-2"), 2)
  t.is(f("2.1"), 2)
  t.is(f("2.9"), 2)
  t.is(f(""), 2)
  t.is(f("  \t \n "), 2)
  t.is(f(null), 2)
  t.is(f(undefined), 2)
  t.is(f("asdf"), 2)
  t.is(f("asdf3"), 2)
  t.is(f("3asdf"), 3)
})
