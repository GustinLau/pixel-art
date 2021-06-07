<template>
  <div class="uploader">
    <template v-if="!previewHtml && !croppedInfo">
      <div class="el-upload">
        <div class="el-upload-dragger"
             :class="{'is-dragover': dragover}"
             @click="handleClick"
             @drop.prevent="handleDrop"
             @dragover.prevent="handleDragOver"
             @dragleave.prevent="dragover = false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将图片拖到此处，或<em data-v-7d622f5c="">点击上传</em></div>
        </div>
        <input ref="input" accept="accept" type="file" name="file" @change="handleChange" class="el-upload__input">
      </div>
    </template>
    <template v-else-if="!croppedInfo">
      <div class="preview">
        <div v-html="previewHtml"/>
      </div>
    </template>
    <template v-else>
      <div class="preview" :class="{ hover : showPreviewAction }" @mouseover="showPreviewAction = true"
           @mouseout="showPreviewAction = false">
        <div class="show-preview" style="overflow: hidden"
             :style="{ width: croppedInfo.width+'px', height: croppedInfo.height+'px' }">
          <div :style="{ width: croppedInfo.width+'px', height: croppedInfo.height+'px' }">
            <img ref="croppedImage" :src="croppedInfo.url" alt="" @load="onCroppedImageLoaded"/>
          </div>
        </div>
        <div class="actions">
          <span class="action" @click="removeCurrentImage">
            <i class="el-icon-delete"></i>
          </span>
        </div>
      </div>
    </template>
    <el-dialog :visible.sync="cropperDialogVisible" title="裁剪" append-to-body :close-on-click-modal="false"
               :close-on-press-escape="false" width="600px" :show-close="false" :destroy-on-close="true">
      <cropper ref="cropper" type="64x64" :image="file" @real-time-html="handleRealTimeChange"/>
      <div slot="footer">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button type="danger" plain @click="close">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import Cropper from './Cropper'

export default {
  name: 'Uploader',
  components: { Cropper },
  props: {
    accept: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      disabled: false,
      dragover: false,
      file: null,
      cropperDialogVisible: false,
      cropperType: '1',
      previewHtml: null,
      croppedInfo: null,
      showPreviewAction: false
    }
  },
  watch: {
    file (val) {
      if (val) {
        this.cropperDialogVisible = true
      }
    }
  },
  methods: {
    // 确定
    submit () {
      this.$refs.cropper.crop()
        .then(info => {
          this.croppedInfo = info
          this.file = null
          this.cropperDialogVisible = false
        })
    },
    // 取消
    close () {
      this.cropperDialogVisible = false
      this.croppedInfo = null
      this.file = null
      this.$emit('close')
    },
    // 裁剪图片加载完毕
    onCroppedImageLoaded () {
      this.$store.dispatch('app/setCroppedImageInfo', {
        el: this.$refs.croppedImage,
        width: this.croppedInfo.originWidth,
        height: this.croppedInfo.originHeight
      })
    },
    // 移除当前图片
    removeCurrentImage () {
      this.croppedInfo = null
      this.$store.dispatch('app/setCroppedImageInfo', null)
    },
    // 实时预览变更
    handleRealTimeChange (html) {
      this.previewHtml = html
    },
    // 当前文件变更
    handleFileChange (file) {
      if (file) {
        this.file = URL.createObjectURL(file)
      } else {
        this.file = null
      }
    },
    // 点击上传
    handleClick () {
      if (!this.disabled) {
        this.$refs.input.value = null
        this.$refs.input.click()
      }
    },
    // input value change
    handleChange (e) {
      const files = e.target.files
      if (!files) return
      this.handleFileChange(files[0])
    },
    // 拖拽
    handleDragOver () {
      if (!this.disabled) {
        this.dragover = true
      }
    },
    // 拖拽完成
    handleDrop (e) {
      this.dragover = false
      if (!this.accept) {
        this.handleFileChange(e.dataTransfer.files[0])
        return
      }
      this.handleFileChange([].slice.call(e.dataTransfer.files).filter(file => {
        const {
          type,
          name
        } = file
        const extension = name.indexOf('.') > -1
          ? `.${name.split('.').pop()}`
          : ''
        const baseType = type.replace(/\/.*$/, '')
        return this.accept.split(',')
          .map(type => type.trim())
          .filter(type => type)
          .some(acceptedType => {
            if (/\..+$/.test(acceptedType)) {
              return extension === acceptedType
            }
            if (/\/\*$/.test(acceptedType)) {
              return baseType === acceptedType.replace(/\/\*$/, '')
            }
            if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
              return type === acceptedType
            }
            return false
          })
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
.uploader {
  .el-upload {
    width: 100%;

    .el-upload-dragger {
      width: 100%;
    }
  }

  .preview {
    min-height: 192px;
    border: 1px solid rgb(217, 217, 217);
    border-radius: 6px;

    /deep/ {
      .show-preview {
        margin: 0 auto;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .actions {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      border-radius: 6px;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, .5);
      transition: opacity .3s;
      display: flex;
      align-items: center;
      justify-content: center;

      .action {
        cursor: pointer;
      }
    }

    &.hover {
      .actions {
        opacity: 1;
      }
    }
  }

}
</style>
