<template>
  <el-container class="h-screen">
    <el-aside></el-aside>
    <div>
      <el-header></el-header> <el-main><router-view></router-view></el-main>
    </div>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  }
})
</script>

<style scoped>
</style>
