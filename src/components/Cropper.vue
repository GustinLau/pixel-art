<template>
  <div class="cropper">
    <div style="height: 300px">
      <vue-cropper
        ref="cropper"
        :img="image"
        output-type="png"
        :info="false"
        :full="true"
        :can-move-box="false"
        :fixed-box="true"
        :center-box="true"
        :high="false"
        :autoCrop="true"
        mode="cover"
        :autoCropWidth="cropperSize.width"
        :autoCropHeight="cropperSize.height"
        @real-time="realTime"
      ></vue-cropper>
    </div>
    <div class="type-box">
      <el-radio v-for="k of Object.keys(SIZE)" :key="k" v-model="cropperType" :label="k" border>{{ k }}</el-radio>
    </div>
  </div>
</template>

<script>

import { SIZE } from '../constants'

export default {
  name: 'Cropper',
  props: {
    image: {
      type: [String, null],
      default: null,
      required: false
    },
    type: {
      type: String,
      default: '64x64',
      required: false
    }
  },
  data () {
    return {
      cropperType: this.type
    }
  },
  computed: {
    SIZE: () => SIZE,
    cropperSize () {
      const [width, height] = SIZE[this.cropperType]
      return {
        originWidth: width,
        originHeight: height,
        width: width * 3,
        height: height * 3
      }
    }
  },
  watch: {
    type: {
      immediate: true,
      handler (val) {
        this.cropperType = val
      }
    },
    cropperType () {
      this.$nextTick(() => {
        this.$refs.cropper.reload()
      })
    }
  },
  methods: {
    // 实时裁剪预览
    realTime (obj) {
      if (this.image) {
        this.$emit('real-time-html', obj.html)
      } else {
        this.$emit('real-time-html', null)
      }
    },
    // 确认裁剪
    crop () {
      return new Promise(resolve => {
        this.$refs.cropper.getCropBlob(data => {
          const url = window.URL.createObjectURL(data)
          URL.revokeObjectURL(data)
          resolve({
            originUrl: url,
            url,
            originWidth: this.cropperSize.originWidth,
            originHeight: this.cropperSize.originHeight,
            width: this.cropperSize.width,
            height: this.cropperSize.height
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.type-box {
  margin-top: 20px;

  .el-radio {
    margin-left: 0 !important;
    margin-right: 16px !important;

    &:last-child {
      margin-right: 0 !important;
    }
  }
}

</style>
