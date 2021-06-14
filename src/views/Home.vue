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
import { hex2RGBArr } from '../units/color'

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
    },
    palette () {
      return this.$store.state.app.colors.map(color => hex2RGBArr(color.value))
    },
    havePalette () {
      return this.palette.length > 0
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
    },
    '$store.state.app.colors' () {
      if (this.showCanvas) {
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
        palette: this.palette,
        height: width * ratio,
        width: height * width
      })
      px.draw()
        .pixelate()
        .setWidth(width)
        .setHeight(height)
        .resizeImage()
      if (this.havePalette && palette) {
        px.convertPalette()
      }
      px.setWidth(width * ratio)
        .setHeight(height * ratio)
        .resizeImage()
      if (drawLine) {
        px.drawLine()
      }
      if (this.havePalette && fillNums) {
        px.fillNumbers()
      }
      if (this.havePalette && statistics) {
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
