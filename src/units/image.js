import { HSL2RGB, isLightColor, RGB2HEX, RGB2HSL } from './color'

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
    canvas.toBlob(blob => resolve(blob))
  })
}

export function download (options) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = options.pixelW
    canvas.height = options.pixelH
    context.drawImage(options.el, 0, 0, options.pixelW, options.pixelH)

    const canvasCopy = document.createElement('canvas')
    const contextCopy = canvasCopy.getContext('2d')

    canvasCopy.width = canvas.width
    canvasCopy.height = canvas.height
    contextCopy.drawImage(canvas, 0, 0)
    const ratio = 32
    canvas.width = canvas.width * ratio
    canvas.height = canvas.height * ratio
    context.mozImageSmoothingEnabled = false
    context.webkitImageSmoothingEnabled = false
    context.imageSmoothingEnabled = false
    context.drawImage(
      canvasCopy,
      0,
      0,
      canvasCopy.width,
      canvasCopy.height,
      0,
      0,
      canvas.width,
      canvas.height
    )
    if (options.havePalette) {
      if (options.drawLine) {
        const w = canvas.width
        const h = canvas.height
        const unit = canvas.width / options.pixelW
        var imgPixels = context.getImageData(0, 0, w, h)
        context.strokeStyle = 'black'
        context.lineWidth = 1
        for (var y = unit; y < imgPixels.height; y += unit) {
          context.beginPath()
          context.moveTo(0, y)
          context.lineTo(w, y)
          context.stroke()
        }
        for (var x = unit; x < imgPixels.width; x += unit) {
          context.beginPath()
          context.moveTo(x, 0)
          context.lineTo(x, h)
          context.stroke()
        }
      }
      if (options.fillNums) {
        const containColorKeys = Object.keys(options.paletteMap)
        if (containColorKeys.length > 0) {
          const colors = options.palette.filter(c => containColorKeys.includes(c.join(',')))
          const unit = canvas.width / options.pixelW
          context.font = `${Math.round(unit * 0.8)}px sans-serif`
          context.textBaseline = 'middle'
          context.textAlign = 'center'
          const offset = 1
          for (let i = 0; i < colors.length; i++) {
            const c = colors[i]
            const k = c.join(',')
            context.fillStyle = isLightColor(c[0], c[1], c[2]) ? '#000' : '#fff'
            for (let j = 0; j < options.paletteMap[k].length; j++) {
              const x = options.paletteMap[k][j] % options.pixelW
              const y = Math.floor(options.paletteMap[k][j] / options.pixelW)
              context.fillText(`${i + 1}`, x * unit + unit / 2, y * unit + unit / 2 + offset, unit)
            }
          }
        }
      }
    }

    canvasCopy.width = canvas.width
    canvasCopy.height = canvas.height
    contextCopy.drawImage(canvas, 0, 0)
    const width = canvas.width
    const height = canvas.height
    const padding = 64
    canvas.width = width + 2 * padding
    canvas.height = height + 2 * padding
    const containColorKeys = Object.keys(options.paletteMap)
    const rectW = 3.5 * ratio
    const rectH = 3.5 * ratio
    const rectM = 2 * ratio
    const maxCols = Math.floor((width + rectM) / (rectW + rectM))
    const cols = Math.min(maxCols, containColorKeys.length)
    const rows = Math.ceil(containColorKeys.length / maxCols)
    if (options.havePalette) {
      canvas.height = canvas.height + (rows * rectH) + (rows - 1) * rectM + padding
    }
    context.mozImageSmoothingEnabled = false
    context.webkitImageSmoothingEnabled = false
    context.imageSmoothingEnabled = false
    context.fillStyle = '#fff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.drawImage(
      canvasCopy,
      0,
      0,
      canvasCopy.width,
      canvasCopy.height,
      padding, // options.x,
      padding, // options.y,
      width,
      height
    )
    if (options.havePalette) {
      const colors = options.palette
        .filter(c => containColorKeys.includes(c.join(',')))
        .map((c, index) => {
          const k = c.join(',')
          return {
            no: index + 1,
            color: RGB2HEX(...c),
            count: options.paletteMap[k].length,
            isLightColor: isLightColor(...c)
          }
        })
      /**
       * 该方法用来绘制一个有填充色的圆角矩形
       *@param cxt:canvas的上下文环境
       *@param x:左上角x轴坐标
       *@param y:左上角y轴坐标
       *@param width:矩形的宽度
       *@param height:矩形的高度
       *@param radius:圆的半径
       *@param fillColor:填充颜色
       **/
      const fillRoundRect = (cxt, x, y, width, height, radius, /* optional */ fillColor) => {
        // 圆的直径必然要小于矩形的宽高
        if (2 * radius > width || 2 * radius > height) {
          return false
        }
        cxt.save()
        cxt.translate(x, y)
        // 绘制圆角矩形的各个边
        drawRoundRectPath(cxt, radius, width, height)
        cxt.fillStyle = fillColor || '#000' // 若是给定了值就用给定的值否则给予默认值
        cxt.fill()
        cxt.restore()
      }

      /**
       * 该方法用来绘制圆角矩形
       *@param cxt:canvas的上下文环境
       *@param x:左上角x轴坐标
       *@param y:左上角y轴坐标
       *@param width:矩形的宽度
       *@param height:矩形的高度
       *@param radius:圆的半径
       *@param lineWidth:线条粗细
       *@param strokeColor:线条颜色
       **/
      const strokeRoundRect = (cxt, x, y, width, height, radius, /* optional */ lineWidth, /* optional */ strokeColor) => {
        // 圆的直径必然要小于矩形的宽高
        if (2 * radius > width || 2 * radius > height) {
          return false
        }
        cxt.save()
        cxt.translate(x, y)
        // 绘制圆角矩形的各个边
        drawRoundRectPath(cxt, radius, width, height)
        cxt.lineWidth = lineWidth || 2 // 若是给定了值就用给定的值否则给予默认值2
        cxt.strokeStyle = strokeColor || '#000'
        cxt.stroke()
        cxt.restore()
      }

      const drawRoundRectPath = (cxt, radius, width, height) => {
        const [r0, r1, r2, r3] = radius
        cxt.beginPath()
        // 从右下角顺时针绘制，弧度从0到1/2PI
        cxt.arc(width - r0, height - r0, r0, 0, Math.PI / 2)
        // 矩形下边线
        cxt.lineTo(r1, height)
        // 左下角圆弧，弧度从1/2PI到PI
        cxt.arc(r1, height - r1, r1, Math.PI / 2, Math.PI)
        // 矩形左边线
        cxt.lineTo(0, r2)
        // 左上角圆弧，弧度从PI到3/2PI
        cxt.arc(r2, r2, r2, Math.PI, Math.PI * 3 / 2)
        // 上边线
        cxt.lineTo(width - r3, 0)
        // 右上角圆弧
        cxt.arc(width - r3, r3, r3, Math.PI * 3 / 2, Math.PI * 2)
        // 右边线
        cxt.lineTo(width, height - r3)
        cxt.closePath()
      }

      let count = 0
      const radius = 12
      const canvasTmp = document.createElement('canvas')
      canvasTmp.width = rectW
      canvasTmp.height = rectH
      const contextTmp = canvasTmp.getContext('2d')
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = padding + col * (rectW + rectM)
          const y = Math.round(height + (padding * 2) + row * (rectH + rectM))
          const colorInfo = colors[count]
          context.shadowOffsetX = 0
          context.shadowOffsetY = 2
          context.shadowBlur = 12
          context.shadowColor = 'rgba(0, 0, 0, 0.1)'
          strokeRoundRect(context, x, y, rectW, rectH, [radius, radius, radius, radius], 1, '#ddd')
          fillRoundRect(context, x - 1, y - 1, rectW + 2, rectH / 2 + 1, [0, 0, radius, radius], colorInfo.color)
          fillRoundRect(context, x, y - 1 + Math.floor(rectH / 2), rectW, rectH / 2 + 1, [radius, radius, 0, 0], '#fff')
          canvasTmp.width = rectW
          contextTmp.fillStyle = 'rgba(255, 255, 255, 0)'
          contextTmp.textBaseline = 'middle'
          contextTmp.textAlign = 'center'
          contextTmp.font = `${Math.round(rectH / 2 * 0.8)}px sans-serif`
          contextTmp.fillStyle = colorInfo.isLightColor ? '#000' : '#fff'
          contextTmp.fillText(colorInfo.no, rectW / 2, rectH / 4, rectW)
          contextTmp.fillStyle = '#000'
          contextTmp.fillText(colorInfo.count, rectW / 2, rectH * 3 / 4, rectW)
          context.drawImage(canvasTmp, x, y)
          count++
          if (count === colors.length) {
            break
          }
        }
      }
    }
    const link = document.createElement('a')
    link.download = 'pixel-art.png'
    link.href = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')
    document.querySelector('body').appendChild(link)
    link.click()
    document.querySelector('body').removeChild(link)
    resolve()
  })
}
