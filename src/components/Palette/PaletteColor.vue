<template>
  <div class="palette-color" :class="{ hover : showAction }" @mouseover="showAction = true"
       @mouseout="showAction = false">
    <div class="color" :style="{background: value}"></div>
    <div class="name">{{ name }}</div>
    <div class="actions">
          <span class="action" @click="removeColor">
            <i class="el-icon-delete"></i>
          </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaletteColor',
  props: {
    value: {
      type: String,
      default: '',
      required: false
    },
    name: {
      type: String,
      default: '',
      required: false
    }
  },
  data () {
    return {
      showAction: false
    }
  },
  methods: {
    removeColor () {
      this.$emit('remove', {
        name: this.name,
        value: this.value
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.palette-color {
  position: relative;
  display: inline-block;
  border-radius: 6px;
  margin-right: 8px;
  margin-bottom: 8px;
  width: 80px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  vertical-align: middle;

  .color {
    width: calc(100% + 2px);
    height: 50px;
    margin: -1px -1px 0 -1px;
    text-align: center;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  .name {
    color: #2b2b2b;
    font-size: 13px;
    line-height: 30px;
    text-align: center;
  }

  .actions {
    position: absolute;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    left: -1px;
    top: -1px;
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
      font-size: 16px;
    }
  }

  &.hover {
    .actions {
      opacity: 1;
    }
  }
}
</style>
