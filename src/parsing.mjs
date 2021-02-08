export const parseIntInRange = (min, max, str, nanDefault = min) =>
  Math.max(min, Math.min(max, parseInt(str, 10) || nanDefault))
