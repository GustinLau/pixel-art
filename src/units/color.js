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

export function RGB2XYZ (R, G, B) {
  const gamma = (c) => c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92
  const RR = gamma(R / 255.0)
  const GG = gamma(G / 255.0)
  const BB = gamma(B / 255.0)
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
  const PARAM_13333 = 1.0 / 3.0
  const PARAM_16116 = 4.0 / 29.0
  const PARAM_77870 = (1.0 / 3.0) * Math.pow(29.0 / 6.9, 2)
  const PARAM_00088 = Math.pow(6.0 / 29.0, 3)
  const Xn = 0.950456
  const Yn = 1.0
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
    Math.max(116.0 * fY - 16.0, 0.0),
    // a
    (500.0 * (fX - fY)),
    // b
    (200.0 * (fY - fZ))
  ]
}

export function RGB2Lab (R, G, B) {
  return XYZ2Lab(...RGB2XYZ(R, G, B))
}
