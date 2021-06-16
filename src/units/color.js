/**
 * 是否明亮颜色
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @return {boolean}
 */
export function isLightColor (r, g, b) {
  return 0.213 * r + 0.715 * g + 0.072 * b > 255 / 2
}

/**
 * RGB转16进制
 * @param {number} R
 * @param {number} G
 * @param {number} B
 * @return {string}
 * @constructor
 */
export function RGB2HEX (R, G, B) {
  let strHex = '#'
  const rgb = [R, G, B]
  // 转成16进制
  for (let i = 0; i < rgb.length; i++) {
    let hex = Number(rgb[i]).toString(16)
    hex = hex.length === 1 ? '0' + hex : hex
    strHex += hex
  }
  return strHex
}

/**
 * 16进制转RGB
 * @param {string} hex
 * @return {[]}
 * @constructor
 */
export function HEX2RGB (hex) {
  // 把颜色值变成小写
  hex = hex.toLowerCase()
  // 如果只有三位的值，需变成六位，如：#fff => #ffffff
  if (hex.length === 4) {
    let colorNew = '#'
    for (let i = 1; i < 4; i += 1) {
      colorNew += hex.slice(i, i + 1).concat(hex.slice(i, i + 1))
    }
    hex = colorNew
  }
  // 处理六位的颜色值，转为RGB
  const color = []
  for (let i = 1; i < 7; i += 2) {
    color.push(parseInt('0x' + hex.slice(i, i + 2)))
  }
  return color
}

/**
 * RGB 转 XYZ 颜色空间
 * @param R
 * @param G
 * @param B
 * @return {number[]}
 * @constructor
 */
export function RGB2XYZ (R, G, B) {
  const gamma = (c) => c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92
  const RR = gamma(R / 255)
  const GG = gamma(G / 255)
  const BB = gamma(B / 255)
  return [
    // X
    (RR * 0.4124 + GG * 0.3576 + BB * 0.1805),
    // Y
    (RR * 0.2126 + GG * 0.7152 + BB * 0.0722),
    // Z
    (RR * 0.0193 + GG * 0.1192 + BB * 0.9505)
  ]
}

/**
 * XYZ 转 Lab 颜色空间
 * @param X
 * @param Y
 * @param Z
 * @return {(number|number)[]}
 * @constructor
 */
export function XYZ2Lab (X, Y, Z) {
  const PARAM_13333 = 1 / 3
  const PARAM_16116 = 4 / 29
  const PARAM_77870 = (1 / 3) * Math.pow(29 / 6.9, 2)
  const PARAM_00088 = Math.pow(6 / 29, 3)
  const Xn = 0.950456
  const Yn = 1
  const Zn = 1.088754
  const ft = (t) => {
    if (t > PARAM_00088) {
      return Math.pow(t, PARAM_13333)
    } else {
      return PARAM_77870 * t + PARAM_16116
    }
  }
  const fX = ft(X / Xn)
  const fY = ft(Y / Yn)
  const fZ = ft(Z / Zn)
  return [
    // L
    Math.max(116 * fY - 16, 0),
    // a
    (500 * (fX - fY)),
    // b
    (200 * (fY - fZ))
  ]
}

/**
 * RGB 转 Lab 颜色空间
 * @param R
 * @param G
 * @param B
 * @return {number[]}
 * @constructor
 */
export function RGB2Lab (R, G, B) {
  return XYZ2Lab(...RGB2XYZ(R, G, B))
}

/**
 * RGB 转 HSV
 * @param R
 * @param G
 * @param B
 * @return {(number|number)[]} H:0-360 S:0-1 V:0-1
 * @constructor
 */
export function RGB2HSV (R, G, B) {
  const min = Math.min(R, G, B)
  const max = Math.max(R, G, B)
  let H, S
  const V = max
  const delta = max - min
  if (delta === 0) { // white, grey, black
    H = S = 0
  } else { // chroma
    S = delta / V
    if (R === max) {
      H = (G - B) / delta // between yellow & magenta
    } else if (G === max) {
      H = 2 + (B - R) / delta // between cyan & yellow
    } else {
      H = 4 + (R - G) / delta // between magenta & cyan
    }
    H = ((H * 60) + 360) % 360 // degrees
  }
  return [H, S, V / 255]
}

/**
 * HSV 转 RGB
 * @param H 0-360
 * @param S 0-1
 * @param V 0-1
 * @return {(number|number)[]}
 * @constructor
 */
export function HSV2RGB (H, S, V) {
  H %= 360
  S = Math.min(Math.max(0, S), 1)
  V = Math.round(Math.min(Math.max(0, V)) * 255)

  let R, G, B

  if (S === 0) {
    // achromatic (grey)
    R = V
    G = V
    B = V
    return [R, G, B]
  }
  const h = H / 60 // sector 0 to 5
  const i = Math.floor(h)
  const f = h - i // factorial part of h
  const p = V * (1 - S)
  const q = V * (1 - S * f)
  const t = V * (1 - S * (1 - f))

  switch (i) {
    case 0:
      R = V
      G = t
      B = p
      break
    case 1:
      R = q
      G = V
      B = p
      break
    case 2:
      R = p
      G = V
      B = t
      break
    case 3:
      R = p
      G = q
      B = V
      break
    case 4:
      R = t
      G = p
      B = V
      break
    default:
      R = V
      G = p
      B = q
      break
  }
  return [Math.round(R), Math.round(G), Math.round(B)]
}

/**
 * HSV 转 HSL
 * @param H 0-360
 * @param S 0-1
 * @param V 0-1
 * @return {(*|number|number)[]} H:0-360 S:0-1 L:0-1
 * @constructor
 */
export function HSV2HSL (H, S, V) {
  H %= 360
  S = Math.min(Math.max(0, S), 1)
  V = Math.min(Math.max(0, V))
  let L = (2 - S) * V
  S = S * V
  if (L && 2 - L) {
    S /= (L <= 1) ? L : 2 - L
  }
  L /= 2
  return [H, S, L]
}

/**
 * HSL 转 HSV
 * @param H 0-360
 * @param S 0-1
 * @param L 0-1
 * @return {(*|number|number)[]} H:0-360 S:0-1 V:0-1
 * @constructor
 */
export function HSL2HSV (H, S, L) {
  H %= 360
  S = Math.min(Math.max(0, S), 1)
  L = Math.min(Math.max(0, L))
  const l = 2 * L
  const s = S * ((l <= 1) ? l : 2 - l)
  const V = (l + s) / 2
  S = ((2 * s) / (l + s)) || 0
  return [H, S, V]
}

/**
 * RGB 转 HSL
 * @param R
 * @param G
 * @param B
 * @return {[number, number, number]} H:0-360 S:0-1 L:0-1
 * @constructor
 */
export function RGB2HSL (R, G, B) {
  return HSV2HSL(...RGB2HSV(R, G, B))
}

/**
 * HSL 转 RGB
 * @param H 0-360
 * @param S 0-1
 * @param L 0-1
 * @return {number[]}
 * @constructor
 */
export function HSL2RGB (H, S, L) {
  return HSV2RGB(...HSL2HSV(H, S, L))
}
