<template>
  <el-container class="h-screen" direction="vertical">
    <el-header class=""></el-header>
    <div class="flex">
      <el-aside></el-aside> <el-main><router-view></router-view></el-main>
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
