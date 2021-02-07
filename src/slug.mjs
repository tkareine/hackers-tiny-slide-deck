export const slug = (str) =>
  str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
