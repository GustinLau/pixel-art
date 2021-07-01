/* eslint-disable camelcase */

//  CIE算法常数
const k_L = 1
const k_C = 1
const k_H = 1
const pow25To7 = 6103515625 /* pow(25, 7) */
const deg2Rad = (deg) => deg * (Math.PI / 180)
const rad2Deg = (rad) => (180 / Math.PI) * rad
const deg360InRad = deg2Rad(360)
const deg180InRad = deg2Rad(180)
const K1 = 0.045
const K2 = 0.015

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
 * Lab 转 Lch 颜色空间
 * @param L
 * @param a
 * @param b
 * @return {(*|number|number)[]}
 * @constructor
 */
export function LabToLch (L, a, b) {
  const C = Math.sqrt(a * a + b * b)
  let H = C <= 0 ? 0 : rad2Deg(Math.atan2(b, a))
  // Shift the H channel to within the range [0, 360]
  while (H >= 360) H -= 360
  while (H < 0) H += 360
  return [L, C, H]
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

/**
 * 欧氏距离
 * @param RGBColor1
 * @param RGBColor2
 */
export function euclidean1 (RGBColor1, RGBColor2) {
  const [r1, g1, b1] = RGBColor1
  const [r2, g2, b2] = RGBColor2
  const deltaR = r1 - r2
  const deltaG = g1 - g2
  const deltaB = b1 - b2
  return Math.sqrt(
    deltaR * deltaR +
    deltaG * deltaG +
    deltaB * deltaB
  )
}

/**
 * 欧氏距离 加权1
 * @param RGBColor1
 * @param RGBColor2
 */
export function euclidean2 (RGBColor1, RGBColor2) {
  const [r1, g1, b1] = RGBColor1
  const [r2, g2, b2] = RGBColor2
  const deltaR = r1 - r2
  const deltaG = g1 - g2
  const deltaB = b1 - b2
  return Math.sqrt(
    2 * deltaR * deltaR +
    4 * deltaG * deltaG +
    3 * deltaB * deltaB
  )
}

/**
 * 欧氏距离 加权2
 * @param RGBColor1
 * @param RGBColor2
 * @return {number}
 */
export function euclidean3 (RGBColor1, RGBColor2) {
  const [r1, g1, b1] = RGBColor1
  const [r2, g2, b2] = RGBColor2
  const rBar = (r1 + r2) / 2
  const deltaR = r1 - r2
  const deltaG = g1 - g2
  const deltaB = b1 - b2
  return Math.sqrt(
    (2 + rBar / 256) * deltaR * deltaR +
    4 * deltaG * deltaG +
    (2 + (255 - rBar) / 256) * deltaB * deltaB
  )
}

/**
 * CIE Delta E 76 Color-Difference algorithm
 * @param LabColor1
 * @param LabColor2
 * @constructor
 */
export function CIEDE76 (LabColor1, LabColor2) {
  let d = 0
  for (let i = 0; i < 3; i++) {
    d += Math.pow(LabColor1[i] - LabColor2[i], 2)
  }
  return Math.sqrt(d)
}

/**
 * CIE Delta E 94 Color-Difference algorithm
 * @param LabColor1
 * @param LabColor2
 * @return {number}
 * @constructor
 */
export function CIEDE94 (LabColor1, LabColor2) {
  const [L1, a1, b1] = LabColor1
  const [L2, a2, b2] = LabColor2
  const c1 = Math.sqrt(a1 * a1 + b1 * b1)
  const c2 = Math.sqrt(a2 * a2 + b2 * b2)
  const deltaL = L1 - L2
  const deltaa = a1 - a2
  const deltab = b1 - b2
  const deltaC = c1 - c2
  const deltaH = Math.sqrt(Math.pow(deltaa, 2) + Math.pow(deltab, 2) - Math.pow(deltaC, 2))
  const S_L = 1
  const S_C = 1 + K1 * c1
  const S_H = 1 + K2 * c1
  return Math.sqrt(
    Math.pow(deltaL / (k_L * S_L), 2) +
    Math.pow(deltaC / (k_C * S_C), 2) +
    Math.pow(deltaH / (k_H * S_H), 2)
  )
}

/**
 * CIE Delta E 2000 Color-Difference algorithm
 * @param LabColor1
 * @param LabColor2
 * @return {number}
 * @constructor
 */
export function CIEDE2000 (LabColor1, LabColor2) {
  const [L1, a1, b1] = LabColor1
  const [L2, a2, b2] = LabColor2
  const C1 = Math.sqrt(a1 * a1 + b1 * b1)
  const C2 = Math.sqrt(a2 * a2 + b2 * b2)
  const CBar = (C1 + C2) / 2
  const G = 0.5 * (1 - Math.sqrt(Math.pow(CBar, 7) / (Math.pow(CBar, 7) + pow25To7)))
  const a1Prime = (1 + G) * a1
  const a2Prime = (1 + G) * a2
  const C1Prime = Math.sqrt(a1Prime * a1Prime + b1 * b1)
  const C2Prime = Math.sqrt(a2Prime * a2Prime + b2 * b2)
  let h1Prime
  if (b1 === 0 && a1Prime === 0) {
    h1Prime = 0
  } else {
    h1Prime = Math.atan2(b1, a1Prime)
    if (h1Prime < 0) {
      h1Prime += deg360InRad
    }
  }
  let h2Prime
  if (b2 === 0 && a2Prime === 0) {
    h2Prime = 0
  } else {
    h2Prime = Math.atan2(b2, a2Prime)
    if (h2Prime < 0) {
      h2Prime += deg360InRad
    }
  }
  const deltaLPrime = L2 - L1
  const deltaCPrime = C2Prime - C1Prime
  const CPrimeProduct = C1Prime * C2Prime
  let deltahPrime
  if (CPrimeProduct === 0) {
    deltahPrime = 0
  } else {
    deltahPrime = h2Prime - h1Prime
    if (deltahPrime < -deg180InRad) {
      deltahPrime += deg360InRad
    } else if (deltahPrime > deg180InRad) {
      deltahPrime -= deg360InRad
    }
  }
  const deltaHPrime = 2 * Math.sqrt(CPrimeProduct) * Math.sin(deltahPrime / 2)
  const LBar = (L1 + L2) / 2
  const CBarPrime = (C1Prime + C2Prime) / 2
  let HBarPrime
  const hPrimeSum = h1Prime + h2Prime
  if (CPrimeProduct === 0) {
    HBarPrime = hPrimeSum
  } else {
    if (Math.abs(h1Prime - h2Prime) <= deg180InRad) {
      HBarPrime = hPrimeSum / 2
    } else {
      if (hPrimeSum < deg360InRad) {
        HBarPrime = (hPrimeSum + deg360InRad) / 2
      } else {
        HBarPrime = (hPrimeSum - deg360InRad) / 2
      }
    }
  }
  const T = 1 - (0.17 * Math.cos(HBarPrime - deg2Rad(30))) +
    (0.24 * Math.cos(2 * HBarPrime)) +
    (0.32 * Math.cos((3 * HBarPrime) + deg2Rad(6))) -
    (0.20 * Math.cos((4 * HBarPrime) - deg2Rad(63)))
  const S_L = 1 + ((0.015 * Math.pow(LBar - 50, 2)) / Math.sqrt(20 + Math.pow(LBar - 50, 2)))
  const S_C = 1 + (0.045 * CBarPrime)
  const S_H = 1 + (0.015 * CBarPrime * T)
  const R_T_C = Math.pow(CBarPrime, 7)
  const R_T = -2 * Math.sqrt(R_T_C / (R_T_C + pow25To7)) * Math.sin(deg2Rad(60) * Math.exp(-Math.pow((HBarPrime - deg2Rad(275)) / deg2Rad(25), 2)))
  return Math.sqrt(
    Math.pow(deltaLPrime / (k_L * S_L), 2) +
    Math.pow(deltaCPrime / (k_C * S_C), 2) +
    Math.pow(deltaHPrime / (k_H * S_H), 2) +
    (R_T * (deltaCPrime / (k_C * S_C)) * (deltaHPrime / (k_H * S_H)))
  )
}

export function cmc (LabColor1, LabColor2) {
  const l = 2
  const c = 1
  const [L1, a1, b1] = LabColor1
  const [L2, a2, b2] = LabColor2
  // eslint-disable-next-line no-unused-vars
  const [_, c1, h1] = LabToLch(L1, a1, b1)
  // eslint-disable-next-line no-unused-vars
  const [__, c2, ___] = LabToLch(L2, a2, b2)
  const c1Pow4 = c1 * c1 * c1 * c1
  const F = Math.sqrt(c1Pow4 / (c1Pow4 + 1900))
  let T
  if (h1 >= 164 && h1 <= 345) {
    T = 0.56 + Math.abs(0.2 * Math.cos(deg2Rad(h1 + 168)))
  } else {
    T = 0.36 + Math.abs(0.4 * Math.cos(deg2Rad((h1 + 35))))
  }
  const sl = L1 < 16 ? 0.511 : (0.040975 * L1) / (1 + 0.01765 * L1)
  const sc = ((0.0638 * c1) / (1 + 0.0131 * c1)) + 0.638
  const sh = sc * (F * T + 1 - F)
  const deltaA = a1 - a2
  const deltaB = b1 - b2
  const deltaC = c1 - c2
  const deltaH = Math.sqrt(deltaA * deltaA + deltaB * deltaB - deltaC * deltaC)
  return Math.sqrt(
    Math.pow((L1 - L2) / (l * sl), 2) +
    Math.pow((c1 - c2) / (c * sc), 2) +
    Math.pow(deltaH / sh, 2)
  )
}
