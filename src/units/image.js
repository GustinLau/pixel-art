import { HSL2RGB, RGB2HSL } from './color'

/**
 * 图片亮度、饱和度、对比度吊装
 * @param {Element} el
 * @param {Object} options width,height,h,s,c percent
 */
export function adjust (el, options) {
  return new Promise(resolve => {
    const canvasOrigin = document.createElement('canvas')
    const contextOrigin = canvasOrigin.getContext('2d')
    canvasOrigin.width = el.naturalWidth
    canvasOrigin.height = el.naturalHeight
    contextOrigin.drawImage(el, 0, 0)
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const {
      width,
      height
    } = options
    canvas.width = width
    canvas.height = height
    context.drawImage(
      canvasOrigin,
      0,
      0,
      canvasOrigin.width,
      canvasOrigin.height,
      0,
      0,
      width,
      height
    )
    const imgPixels = context.getImageData(0, 0, width, height)
    let sum = 0
    for (let y = 0; y < imgPixels.height; y++) {
      for (let x = 0; x < imgPixels.width; x++) {
        const i = y * 4 * imgPixels.width + x * 4
        const R = imgPixels.data[i]
        const G = imgPixels.data[i + 1]
        const B = imgPixels.data[i + 2]
        const hsl = RGB2HSL(R, G, B)
        // 对比度
        if (options.c) {
          // 求和
          sum += R + G + B
        }
        if (options.s || options.l) {
          // 饱和度
          if (options.s) {
            options.s = Math.max(options.s, -1)
            options.s = Math.min(options.s, 1)
            hsl[1] *= (1 + options.s)
          }
          // 亮度
          if (options.l) {
            options.l = Math.max(options.l, -1)
            options.l = Math.min(options.l, 1)
            hsl[2] *= (1 + options.l)
          }
          const newRGB = HSL2RGB(...hsl)
          imgPixels.data[i] = newRGB[0]
          imgPixels.data[i + 1] = newRGB[1]
          imgPixels.data[i + 2] = newRGB[2]
        }
      }
    }
    if (options.c) {
      options.c = Math.max(options.c, -1)
      options.c = Math.min(options.c, 1)
      const avg = sum / imgPixels.data.length
      for (let y = 0; y < imgPixels.height; y++) {
        for (let x = 0; x < imgPixels.width; x++) {
          const i = y * 4 * imgPixels.width + x * 4
          const R = imgPixels.data[i]
          const G = imgPixels.data[i + 1]
          const B = imgPixels.data[i + 2]
          if (options.c < 0) {
            if (options.c === -1) {
              const c = Math.round(avg)
              imgPixels.data[i] = c
              imgPixels.data[i + 1] = c
              imgPixels.data[i + 2] = c
            } else {
              imgPixels.data[i] = Math.round(R + (R - avg) * options.c)
              imgPixels.data[i + 1] = Math.round(G + (G - avg) * options.c)
              imgPixels.data[i + 2] = Math.round(B + (B - avg) * options.c)
            }
          } else {
            const c = 255 * 255 / (255 - 255 * options.c) - 255
            imgPixels.data[i] = Math.round(R + (R - avg) * c / 255)
            imgPixels.data[i + 1] = Math.round(G + (G - avg) * c / 255)
            imgPixels.data[i + 2] = Math.round(B + (B - avg) * c / 255)
          }
        }
      }
    }
    context.putImageData(imgPixels, 0, 0, 0, 0, width, height)
    canvas.toBlob(blob => {
      resolve(blob)
    })
  })
}
