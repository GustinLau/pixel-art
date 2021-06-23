/**
 * 是否16进制格式颜色
 * @param str
 * @return {boolean}
 */
export function isColor (str) {
  return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(str)
}
