<template>
  <div>
    <el-link :underline="false" @click="drawerVisible = true">
      <i class="el-icon-brush"></i>
    </el-link>
    <el-drawer
      title="调色板"
      :visible.sync="drawerVisible"
      direction="ltr"
      :append-to-body="true"
    >
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Setting',
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
