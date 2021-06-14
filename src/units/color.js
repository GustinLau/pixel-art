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

export function rgbArr2Hex (rgbArr) {
  var strHex = '#'
  // 转成16进制
  for (let i = 0; i < rgbArr.length; i++) {
    let hex = Number(rgbArr[i]).toString(16)
    hex = hex.length === 1 ? '0' + hex : hex
    strHex += hex
  }
  return strHex
}

export function hex2RGBArr (hex) {
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

export function RGB2Lab (R, G, B) {
  return XYZ2Lab(...RGB2XYZ(R, G, B))
}

/**
 *
 * @param R
 * @param G
 * @param B
 * @return {(number|number)[]} H:0-360 S:0-1 V:0-255
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

export function RGB2HSL (R, G, B) {
  return HSV2HSL(...RGB2HSV(R, G, B))
}
