export function isColor (str) {
  return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(str)
}
