<template>
  <div>
    <el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
    <div>
      <div>readonly</div>
      <div>{{ readonly }}</div>
    </div>
    <el-button @click="toggleReadonly">toggle</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref()
const readonly = ref(false)

function toggleReadonly() {
  readonly.value = !readonly.value
}
</script>

<style scoped></style>
