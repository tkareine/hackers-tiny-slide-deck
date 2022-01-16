import test from "ava"
import { parseIntInRange } from "../parsing.mjs"

const testParseIntInRange = (() => {
  const defaultMin = 2
  const defaultMax = 6

  return test.macro({
    exec: (t, inputStr, expected, min = defaultMin, max = defaultMax) => {
      t.is(parseIntInRange(min, max, inputStr), expected)
    },
    title: (providedTitle = "", inputStr, expected, min = defaultMin, max = defaultMax) =>
      `${providedTitle} parseIntIntInRange("${inputStr}", ${min}, ${max}) = ${expected}`.trim(),
  })
})()

test(testParseIntInRange, "0", 2)
test(testParseIntInRange, "1", 2)
test(testParseIntInRange, "2", 2)
test(testParseIntInRange, "3", 3)
test(testParseIntInRange, "5", 5)
test(testParseIntInRange, "6", 6)
test(testParseIntInRange, "7", 6)
test(testParseIntInRange, "-1", 2)
test(testParseIntInRange, "-2", 2)
test(testParseIntInRange, "2.1", 2)
test(testParseIntInRange, "2.9", 2)
test(testParseIntInRange, "", 2)
test(testParseIntInRange, "  \t \n ", 2)
test(testParseIntInRange, null, 2)
test(testParseIntInRange, undefined, 2)
test(testParseIntInRange, "asdf", 2)
test(testParseIntInRange, "asdf3", 2)
test(testParseIntInRange, "3asdf", 3)
