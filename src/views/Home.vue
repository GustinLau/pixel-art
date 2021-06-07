<template>
  <div class="home">
    <div class="sidebar">
      <sidebar/>
    </div>
    <div class="container">
      <template v-if="showCanvas">
        <canvas class="canvas" ref="canvas"></canvas>
        <div class="statistics" v-if="statistics">
          <div v-for="(item,idx) of statistics" :key="idx" class="statistics-box">
            <div class="color" :style="{background: `rgba(${item.color})`,color:item.isLightColor ? '#000' : '#fff' }">
              {{ item.no }}
            </div>
            <div class="count">{{ item.count }}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { Pixelit } from '../units/pixelit'
import Sidebar from '../components/Sidebar'

export default {
  name: 'Home',
  components: { Sidebar },
  data () {
    return {
      croppedImageInfo: null,
      showCanvas: false,
      statistics: null
    }
  },
  computed: {
    config () {
      return this.$store.state.app.config
    }
  },
  watch: {
    '$store.state.app.croppedImageInfo' (info) {
      this.showCanvas = !!info
      this.$nextTick(() => {
        this.croppedImageInfo = info
      })
    },
    croppedImageInfo (info) {
      if (info) {
        this.draw()
      }
    },
    config: {
      deep: true,
      handler () {
        this.statistics = null
        this.draw()
      }
    }
  },
  methods: {
    draw () {
      const {
        el,
        width,
        height
      } = this.croppedImageInfo
      const {
        algorithm,
        drawLine,
        palette,
        fillNums,
        statistics
      } = this.config
      const ratio = 512 / width
      const px = new Pixelit({
        to: this.$refs.canvas,
        from: el,
        similarColorAlgorithm: algorithm,
        pixelW: width,
        pixelH: height,
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
        height: width * ratio,
        width: height * width
      })
      px.draw()
        .pixelate()
        .setWidth(width)
        .setHeight(height)
        .resizeImage()
      if (palette) {
        px.convertPalette()
      }
      px.setWidth(width * ratio)
        .setHeight(height * ratio)
        .resizeImage()
      if (drawLine) {
        px.drawLine()
      }
      if (fillNums) {
        px.fillNumbers()
      }
      if (statistics) {
        this.statistics = px.statistics()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  height: 100vh;

  .sidebar {
    position: fixed;
    background: #fff;
    width: 360px;
    height: 100%;
    z-index: 2000;
  }

  .container {
    margin-left: 392px;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;

    .statistics {
      margin-top: 32px;

      .statistics-box {
        display: inline-block;
        border-radius: 6px;
        margin: 8px;
        width: 44px;
        border: 1px solid #ddd;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

        .color {
          width: calc(100% + 2px);
          height: 22px;
          margin: -1px -1px 0 -1px;
          line-height: 22px;
          text-align: center;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
        }

        .count {
          line-height: 22px;
          text-align: center;
        }
      }
    }

  }
}

</style>
