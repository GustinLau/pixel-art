<template>
  <div class="home">
    <img ref="img" alt="Vue logo" src="../assets/avatar4.jpeg" style="width: 512px">
    <canvas ref="canvas"></canvas>
    <button @click="draw">draw</button>
  </div>
</template>

<script>
import { Pixelit } from '../units/pixelit'

export default {
  name: 'Home',
  methods: {
    draw () {
      const px = new Pixelit({
        to: this.$refs.canvas,
        from: this.$refs.img,
        pixelW: 64,
        pixelH: 64,
        palette: [
          // 1-黄色
          [213, 197, 32],
          // 2-蓝灰
          [152, 176, 204],
          // 3-绿色-千岁绿
          [29, 108, 78],
          // 4-肤色-练色
          [213, 196, 161],
          // 5-淡粉-丁香色
          [192, 160, 224],
          // 6-黑色
          [0, 0, 0],
          // 7-白色
          [240, 240, 240],
          // 8-深棕-枯茶
          [81, 49, 39],
          // 9-银灰-钝色
          [86, 89, 92],
          // 10-浅蓝
          [124, 152, 174],
          // 11-草绿-豆青
          [132, 190, 61],
          // 12-红-真红
          [146, 10, 9],
          // 13-紫红-品红
          [196, 0, 152],
          // 14=淡灰
          [164, 169, 167],
          // 15-淡棕色
          [116, 94, 65],
          // 16-浅棕色
          [141, 109, 65],
          // 17-虾黄
          [186, 143, 94],
          // 18-浅澄
          [251, 153, 102],
          // 19-橙色
          [234, 139, 93],
          // 20-蓝色
          [53, 93, 181],
          // 21-紫蓝色
          [21, 0, 87],
          // 22-紫色
          [75, 33, 93],
          // 23-浅绿
          [78, 167, 181],
          // 24-墨绿
          [29, 73, 66]
        ],
        height: 512,
        width: 512
      })
      px.draw().pixelate()
        .setWidth(64).setHeight(64).resizeImage()
        // .convertGrayscale()
        .convertPalette()
        .setWidth(512).setHeight(512).resizeImage()
        .drawLine()
        // .fillNumbers()

      console.log(px.getPaletteMap())
      // .setWidth(512).setHeight(512).resizeImage()
    }
  }
}
</script>
