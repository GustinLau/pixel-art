<template>
  <el-drawer
    title="调色板"
    class="palette-drawer"
    :visible.sync="drawerVisible"
    direction="ltr"
    size="auto"
    :append-to-body="true"
  >
    <div class="palette-container">
      <palette-color v-for="(item, idx) of colors" :key="`color_${idx}`" :name="item.name" :value="item.value"
                     @remove="removeColor"/>
      <el-button class="add-btn" size="small" icon="el-icon-plus" @click="dialogVisible = true"></el-button>
    </div>
    <div class="footer">
      <input ref="input" type="file" name="file" accept="application/json" @change="handleInputChange" class="hidden">
      <el-button @click="importPalette" icon="el-icon-upload2">导入</el-button>
      <el-button @click="exportPalette" icon="el-icon-download">导出</el-button>
    </div>
    <el-dialog
      title="新颜色"
      :visible.sync="dialogVisible"
      width="300px"
      append-to-body
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @closed="handleDialogClosed"
    >
      <div class="create-color-dialog">
        <el-row>
          <el-col :span="4">
            名称:
          </el-col>
          <el-col :span="20">
            <el-input ref="colorName" v-model.trim="colorName"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            代码:
          </el-col>
          <el-col :span="20">
            <el-input ref="colorValue" v-model="colorValue" :maxlength="6">
              <template slot="prepend">#</template>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmNewColor">确 定</el-button>
      </div>
    </el-dialog>
  </el-drawer>
</template>

<script>
import PaletteColor from './PaletteColor'
import { isColor } from '../../units/validator'

export default {
  name: 'Palette',
  components: { PaletteColor },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      colors: this.$store.state.app.colors.concat(),
      drawerVisible: false,
      dialogVisible: false,
      colorName: '',
      shadowColorValue: ''
    }
  },
  computed: {
    colorValue: {
      get: function () {
        return this.shadowColorValue
      },
      set: function (val) {
        this.shadowColorValue = val.toUpperCase()
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler (val) {
        this.drawerVisible = val
      }
    },
    drawerVisible (visible) {
      this.$emit('update:visible', visible)
    },
    '$store.state.app.colors' (colors) {
      this.colors = colors
    }
  },
  methods: {
    // 保存调色板颜色
    setLocalPalette (colors) {
      return this.$store.dispatch('app/setColors', colors || this.colors)
    },
    // 删除颜色
    removeColor (color) {
      this.colors = this.colors.filter(c => c.name !== color.name)
      this.setLocalPalette()
    },
    // 弹窗关闭
    handleDialogClosed () {
      this.colorName = ''
      this.colorValue = ''
    },
    // 确认
    confirmNewColor () {
      if (!this.colorName) {
        this.$notify({
          type: 'error',
          title: '请输入颜色名称'
        })
        this.$refs.colorName.focus()
        return
      }
      if (!this.colorValue || !isColor('#' + this.colorValue)) {
        this.$notify({
          type: 'error',
          title: '请输入颜色代码'
        })
        this.$refs.colorValue.focus()
        return
      }
      if (this.addColor()) {
        this.dialogVisible = false
      }
    },
    // 添加颜色
    addColor () {
      if (!this.colors.some(color => color.name === this.colorName)) {
        this.colors.push({
          name: this.colorName,
          value: '#' + this.colorValue
        })
        this.setLocalPalette()
        return true
      } else {
        this.$notify({
          type: 'error',
          message: '颜色名称已存在'
        })
        return false
      }
    },
    // 上传文件变化
    handleInputChange (e) {
      const files = e.target.files
      if (!files) return
      const reader = new FileReader()
      reader.onload = (event) => {
        // 文件里的文本会在这里被打印出来
        try {
          const json = JSON.parse(event.target.result)
          if (json instanceof Array) {
            if (json.every(item => item.name && item.value && isColor(item.value))) {
              const ks = json.map(item => item.name)
              const set = new Set(ks)
              if (ks.length === set.size) {
                this.setLocalPalette(json)
                this.$notify({
                  type: 'success',
                  title: '导入成功'
                })
              } else {
                throw new Error('内容错误')
              }
            } else {
              throw new Error('内容错误')
            }
          } else {
            throw new Error('格式错误')
          }
        } catch (e) {
          this.$notify({
            type: 'error',
            title: '文件有误，请确认！'
          })
        }
      }
      reader.readAsText(files[0])
    },
    importPalette () {
      this.$refs.input.value = null
      this.$refs.input.click()
    },
    // 导出调色板配置
    exportPalette () {
      const aTag = document.createElement('a')
      const blob = new Blob([JSON.stringify(this.colors)])
      aTag.download = 'palette.json'
      aTag.href = URL.createObjectURL(blob)
      aTag.click()
      URL.revokeObjectURL(blob)
    }
  }
}
</script>

<style lang="scss" scoped>

.palette-container {
  width: 392px;
  padding: 0 20px 40px 20px;

  .palette-color:nth-child(4n) {
    margin-right: 0;
  }

  .add-btn {
    vertical-align: middle;
    line-height: 61px;
    width: 80px;
    font-size: 32px;
    border-radius: 6px;
    margin-bottom: 8px;
  }

}

.footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 8px 0;
  background: #ffffff;
  text-align: center;

  .hidden {
    display: none;
  }
}

.create-color-dialog {
  .el-row {
    &:not(:last-child) {
      margin-bottom: 16px;
    }

    .el-col {
      line-height: 32px;

      &.label {
        text-align: right;
      }
    }
  }
}
</style>
