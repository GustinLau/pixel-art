<template>
  <div>
    <el-link :underline="false" @click="drawerVisible = true">
      <i class="el-icon-brush"></i>
    </el-link>
    <palette :visible.sync="drawerVisible"/>
  </div>
</template>

<script>

import Palette from './Palette/index'
export default {
  name: 'Setting',
  components: { Palette },
  data () {
    return {
      drawerVisible: false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-link {
  font-size: 24px;
  line-height: 44px;
}
</style>
