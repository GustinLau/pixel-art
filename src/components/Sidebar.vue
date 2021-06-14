<template>
  <div class="sidebar">
    <div class="setting">
      <setting/>
    </div>
    <h1 class="title">PIXEL ART</h1>
    <el-row>
      <el-col :span="24">
        <div class="upload">
          <uploader accept="image/jpeg,image/png"/>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="6">
        <label class="label">颜色算法</label>
      </el-col>
      <el-col :span="15">
        <el-select v-model="config.algorithm" class="control" placeholder="请选择">
          <el-option
            v-for="item in ALGORITHMS"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
          <i class="label el-icon-question"></i>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="6">
        <label class="label">模式</label>
      </el-col>
      <el-col :span="18">
        <div class="mode-group">
          <el-checkbox v-model="config.drawLine">像素描边</el-checkbox>
          <el-checkbox v-model="config.palette" :disabled="!havePalette">调色板</el-checkbox>
          <el-checkbox v-model="config.fillNums" :disabled="!havePalette || !config.palette">填充数字</el-checkbox>
          <el-checkbox v-model="config.statistics" :disabled="!havePalette || !config.palette">统计</el-checkbox>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="6">
        <label class="label">亮度</label>
      </el-col>
      <el-col :span="18">
        <div class="mode-group">
          <el-slider v-model="brightness" :min="-100" :max="100" :format-tooltip="formatTooltip"
                     :disabled="!canvasShowed"/>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="6">
        <label class="label">对比度</label>
      </el-col>
      <el-col :span="18">
        <div class="mode-group">
          <el-slider v-model="contrast" :min="-100" :max="100" :format-tooltip="formatTooltip"
                     :disabled="!canvasShowed"/>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="6">
        <label class="label">饱和度</label>
      </el-col>
      <el-col :span="18">
        <div class="mode-group">
          <el-slider v-model="saturation" :min="-100" :max="100" :format-tooltip="formatTooltip"
                     :disabled="!canvasShowed"/>
        </div>
      </el-col>
    </el-row>
    <el-button icon="el-icon-download" type="primary" :disabled="!canvasShowed">下载图片</el-button>
  </div>
</template>

<script>
import Setting from './Setting'
import Uploader from './Uploader'
import { ALGORITHMS } from '../constants'

export default {
  name: 'Sidebar',
  components: {
    Uploader,
    Setting
  },
  data () {
    const config = { ...this.$store.state.app.config }
    return {
      config,
      brightness: 0,
      contrast: 0,
      saturation: 0
    }
  },
  computed: {
    ALGORITHMS: () => ALGORITHMS,
    canvasShowed () {
      return !!this.$store.state.app.croppedImageInfo
    },
    havePalette () {
      return this.$store.state.app.colors.length > 0
    }
  },
  watch: {
    config: {
      deep: true,
      handler (val) {
        this.$store.dispatch('app/setConfig', val)
      }
    },
    '$store.state.app.croppedImageInfo' () {
      this.brightness = 0
      this.contrast = 0
      this.saturation = 0
    }
  },
  methods: {
    formatTooltip (val) {
      return val / 100
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
  height: 100%;
  overflow: auto;
  border-right: 1px solid #CDCDCD;

  .setting {
    position: absolute;
    left: 16px;
    top: 16px;
  }

  .title {
    line-height: 44px;
    margin: 16px 0;
  }

  .el-row {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .label {
    display: block;
    width: 100%;
    line-height: 40px;
    text-align: right;
  }

  .control {
    width: 100%;
  }

  .mode-group {
    text-align: left;
  }
}
</style>
