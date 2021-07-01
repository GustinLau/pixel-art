/**
 * pixelit - convert an image to Pixel Art, with/out grayscale and based on a color palette.
 * @author José Moreira @ <https://github.com/giventofly/pixelit>
 **/

import { CIEDE2000, CIEDE76, CIEDE94, cmc, euclidean1, euclidean2, euclidean3, isLightColor, RGB2Lab } from './color'

export const ALGORITHMS = {
  CIE76: 'CIE76',
  CIE94: 'CIE94',
  CIE2000: 'CIE2000',
  Euclidean_1: 'Euclidean_1',
  Euclidean_2: 'Euclidean_2',
  Euclidean_3: 'Euclidean_3',
  CMC: 'CMC'
}

// Lab空间颜色算法
const LAB_ALGORITHMS = [ALGORITHMS.CIE76, ALGORITHMS.CIE94, ALGORITHMS.CIE2000, ALGORITHMS.CMC]

export class Pixelit {
  constructor (config = {}) {
    // target for canvas
    this.drawto = config.to || document.getElementById('pixelitcanvas')
    // origin of uploaded image/src img
    this.drawfrom = config.from || document.getElementById('pixelitimg')
    // 相似颜色算法
    this.similarColorAlgorithm = config.similarColorAlgorithm || ALGORITHMS.CIE76
    this.pixelW = config.pixelW || 64
    this.pixelH = config.pixelH || 64
    this.palette = config.palette || [
      [140, 143, 174],
      [88, 69, 99],
      [62, 33, 55],
      [154, 99, 72],
      [215, 155, 125],
      [245, 237, 186],
      [192, 199, 65],
      [100, 125, 52],
      [228, 148, 58],
      [157, 48, 59],
      [210, 100, 113],
      [112, 55, 127],
      [126, 196, 193],
      [52, 133, 157],
      [23, 67, 75],
      [31, 14, 28]
    ]
    this.height = config.height
    this.width = config.width
    this.ctx = this.drawto.getContext('2d')
    this.paletteMap = {}
    this.paletteLab = {}
    if (LAB_ALGORITHMS.includes(this.similarColorAlgorithm)) {
      this.palette.map(color => RGB2Lab(...color)).forEach((color, idx) => {
        this.paletteLab[this.palette[idx].join(',')] = color
      })
    }
  }

  /** hide from image */
  hideFromImg () {
    this.drawfrom.style.visibility = 'hidden'
    this.drawfrom.style.position = 'fixed'
    this.drawfrom.style.top = 0
    this.drawfrom.style.left = 0
    return this
  }

  /**
   * @param {string} src Change the src from the image element
   */
  setFromImgSource (src) {
    this.drawfrom.src = src
    return this
  }

  /**
   *
   * @param {Element} elem set element to read image from
   */
  setDrawFrom (elem) {
    this.drawfrom = elem
    return this
  }

  /**
   *
   * @param {Element} elem set element canvas to write the image
   */
  setDrawTo (elem) {
    this.drawto = elem
    return this
  }

  /**
   *
   * @param {array} arr Array of rgb colors: [[int,int,int]]
   */
  setPalette (arr) {
    this.palette = arr
    return this
  }

  /**
   *
   * @param {string} similarColorAlgorithm
   */
  setSimilarColorAlgorithm (similarColorAlgorithm) {
    this.similarColorAlgorithm = similarColorAlgorithm
    if (LAB_ALGORITHMS.includes(this.similarColorAlgorithm)) {
      this.paletteLab = {}
      this.palette.map(color => RGB2Lab(...color)).forEach((color, idx) => {
        this.paletteLab[this.palette[idx].join(',')] = color
      })
    }
  }

  /**
   *
   * @param {int} width set canvas image width
   */
  setWidth (width) {
    this.width = width
    return this
  }

  /**
   *
   * @param {int} height set canvas image height
   */
  setHeight (height) {
    this.height = height
    return this
  }

  /**
   *
   * @param {int} pixelW set pixel number of width
   */
  setPixelW (pixelW) {
    this.pixelW = pixelW
    return this
  }

  /**
   *
   * @param {int} pixelH set pixel number of height
   */
  setPixelH (pixelH) {
    this.pixelH = pixelH
    return this
  }

  /**
   *
   returns {arr} of current palette
   */
  getPalette () {
    return this.palette
  }

  getPaletteMap () {
    return this.paletteMap
  }

  /**
   * color similarity between colors, lower is better
   * @param {array} color array of ints to make a color: [double,double,double]
   * @param {array} compareColor array of ints to make a color: [double,double,double]
   * @param {string} type type of color default rgb
   * @returns {number} limits [0-441.6729559300637]
   */

  colorSim (color, compareColor, type = 'RGB') {
    if (this.similarColorAlgorithm === ALGORITHMS.Euclidean_1) {
      return euclidean1(color, compareColor)
    }
    if (this.similarColorAlgorithm === ALGORITHMS.Euclidean_2) {
      return euclidean2(color, compareColor)
    }
    if (this.similarColorAlgorithm === ALGORITHMS.Euclidean_3) {
      return euclidean3(color, compareColor)
    }
    if (this.similarColorAlgorithm === ALGORITHMS.CIE76) {
      return CIEDE76(color, compareColor)
    }
    if (this.similarColorAlgorithm === ALGORITHMS.CIE94) {
      return CIEDE94(color, compareColor)
    }
    if (this.similarColorAlgorithm === ALGORITHMS.CIE2000) {
      return CIEDE2000(color, compareColor)
    }
    if (this.similarColorAlgorithm === ALGORITHMS.CMC) {
      return cmc(color, compareColor)
    }
  }

  /**
   * given actualColor, check from the paletteColors the most aproximated color
   * @param {array} actualColor rgb color to compare [int,int,int]
   * @returns {array} aproximated rgb color
   */

  similarColor (actualColor) {
    let selectedColor = []
    let minSim = Infinity
    let type = 'RGB'
    if ([ALGORITHMS.CIE76, ALGORITHMS.CIE94, ALGORITHMS.CIE2000].includes(this.similarColorAlgorithm)) {
      actualColor = RGB2Lab(...actualColor)
      type = 'Lab'
    }
    this.palette.forEach((color) => {
      let _color = color
      if ([ALGORITHMS.CIE76, ALGORITHMS.CIE94, ALGORITHMS.CIE2000].includes(this.similarColorAlgorithm)) {
        _color = this.paletteLab[color.join(',')]
      }
      const currSim = this.colorSim(actualColor, _color, type)
      if (currSim <= minSim) {
        selectedColor = color
        minSim = currSim
      }
    })
    return selectedColor
  }

  /**
   * pixelate based on @author rogeriopvl <https://github.com/rogeriopvl/8bit>
   * Draws a pixelated version of an image in a given canvas
   */
  pixelate () {
    this.drawto.width = this.drawfrom.naturalWidth
    this.drawto.height = this.drawfrom.naturalHeight

    const pixelW = this.pixelW
    const pixelH = this.pixelH

    // make temporary canvas to make new scaled copy
    const tempCanvas = document.createElement('canvas')

    // get the context
    const tempContext = tempCanvas.getContext('2d')
    // draw the image into the canvas
    tempContext.drawImage(this.drawfrom, 0, 0, pixelW, pixelH)
    document.body.appendChild(tempCanvas)

    // configs to pixelate
    this.ctx.mozImageSmoothingEnabled = false
    this.ctx.webkitImageSmoothingEnabled = false
    this.ctx.imageSmoothingEnabled = false

    // draw to final canvas
    this.ctx.drawImage(
      tempCanvas,
      0,
      0,
      pixelW,
      pixelH,
      0,
      0,
      this.drawfrom.naturalWidth,
      this.drawfrom.naturalHeight
    )
    // remove temp element
    tempCanvas.remove()

    return this
  }

  /**
   * Converts image to grayscale
   */
  convertGrayscale () {
    const w = this.drawto.width
    const h = this.drawto.height
    var imgPixels = this.ctx.getImageData(0, 0, w, h)
    for (var y = 0; y < imgPixels.height; y++) {
      for (var x = 0; x < imgPixels.width; x++) {
        var i = y * 4 * imgPixels.width + x * 4
        var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3
        imgPixels.data[i] = avg
        imgPixels.data[i + 1] = avg
        imgPixels.data[i + 2] = avg
      }
    }
    this.ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height)
    return this
  }

  /**
   * converts image to palette using the defined palette or default palette
   */
  convertPalette () {
    const w = this.drawto.width
    const h = this.drawto.height
    var imgPixels = this.ctx.getImageData(0, 0, w, h)
    let index = 0
    for (var y = 0; y < imgPixels.height; y++) {
      for (var x = 0; x < imgPixels.width; x++) {
        var i = y * 4 * imgPixels.width + x * 4
        const finalcolor = this.similarColor([
          imgPixels.data[i],
          imgPixels.data[i + 1],
          imgPixels.data[i + 2]
        ])
        imgPixels.data[i] = finalcolor[0]
        imgPixels.data[i + 1] = finalcolor[1]
        imgPixels.data[i + 2] = finalcolor[2]
        const k = `${finalcolor[0]},${finalcolor[1]},${finalcolor[2]}`
        if (this.paletteMap[k]) {
          this.paletteMap[k].push(index++)
        } else {
          this.paletteMap[k] = [index++]
        }
      }
    }
    this.ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height)
    return this
  }

  /**
   * Resizes image proportionally according to a max width or max height
   * height takes precedence if definied
   */
  resizeImage () {
    // var ctx = canvas.getContext("2d")
    const canvasCopy = document.createElement('canvas')
    const copyContext = canvasCopy.getContext('2d')

    // if none defined skip
    if (!this.width && !this.height) {
      return 0
    }

    canvasCopy.width = this.drawto.width
    canvasCopy.height = this.drawto.height
    copyContext.drawImage(this.drawto, 0, 0)

    this.drawto.width = this.width
    this.drawto.height = this.height
    this.ctx.mozImageSmoothingEnabled = false
    this.ctx.webkitImageSmoothingEnabled = false
    this.ctx.imageSmoothingEnabled = false
    this.ctx.drawImage(
      canvasCopy,
      0,
      0,
      canvasCopy.width,
      canvasCopy.height,
      0,
      0,
      this.drawto.width,
      this.drawto.height
    )

    return this
  }

  /**
   * draw to canvas from image source and resize
   *
   */
  draw () {
    // draw image to canvas
    this.drawto.width = this.drawfrom.width
    this.drawto.height = this.drawfrom.height
    // draw
    this.ctx.drawImage(this.drawfrom, 0, 0)
    // resize is always done
    this.resizeImage()
    return this
  }

  /**
   * 画分割线
   * @return {Pixelit}
   */
  drawLine () {
    const w = this.drawto.width
    const h = this.drawto.height
    const unit = this.drawto.width / this.pixelW
    var imgPixels = this.ctx.getImageData(0, 0, w, h)
    this.ctx.strokeStyle = 'black'
    this.ctx.lineWidth = 1
    for (var y = unit; y < imgPixels.height; y += unit) {
      this.ctx.beginPath()
      this.ctx.moveTo(0, y)
      this.ctx.lineTo(w, y)
      this.ctx.stroke()
    }
    for (var x = unit; x < imgPixels.width; x += unit) {
      this.ctx.beginPath()
      this.ctx.moveTo(x, 0)
      this.ctx.lineTo(x, h)
      this.ctx.stroke()
    }
    return this
  }

  /**
   * 填充数字
   * @return {Pixelit}
   */
  fillNumbers () {
    const containColorKeys = Object.keys(this.paletteMap)
    if (containColorKeys.length > 0) {
      const colors = this.palette.filter(c => containColorKeys.includes(c.join(',')))
      const unit = this.drawto.width / this.pixelW
      this.ctx.font = `${Math.floor(unit * 0.8)}px sans-serif`
      this.ctx.textBaseline = 'middle'
      this.ctx.textAlign = 'center'
      const offset = 1
      for (let i = 0; i < colors.length; i++) {
        const c = colors[i]
        const k = c.join(',')
        this.ctx.fillStyle = isLightColor(c[0], c[1], c[2]) ? '#000' : '#fff'
        for (let j = 0; j < this.paletteMap[k].length; j++) {
          const x = this.paletteMap[k][j] % this.pixelW
          const y = Math.floor(this.paletteMap[k][j] / this.pixelW)
          this.ctx.fillText(`${i + 1}`, x * unit + unit / 2, y * unit + unit / 2 + offset, unit)
        }
      }
    }
    return this
  }

  /**
   * 统计颜色数量
   */
  statistics () {
    const containColorKeys = Object.keys(this.paletteMap)
    const colors = this.palette.filter(c => containColorKeys.includes(c.join(',')))
    return colors.map((c, index) => {
      const k = c.join(',')
      return {
        no: index + 1,
        color: k,
        count: this.paletteMap[k].length,
        isLightColor: isLightColor(...c)
      }
    })
  }

  /**
   * Save image from canvas
   */
  saveImage () {
    const link = document.createElement('a')
    link.download = 'pxArt.png'
    link.href = this.drawto
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')
    document.querySelector('body').appendChild(link)
    link.click()
    document.querySelector('body').removeChild(link)
  }

  // end class
}
