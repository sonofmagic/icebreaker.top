<template>
  <el-upload ref="uploadRef" action="" :http-request="customHttpRequest">
    <slot></slot>
    <template #trigger>
      <slot name="trigger"></slot>
    </template>
    <template #tip>
      <slot name="tip"></slot>
    </template>
    <template #file="{ file }">
      <slot name="file" :file="file"></slot>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { genFileId } from 'element-plus'
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadRequestOptions
} from 'element-plus'
const uploadRef = ref<UploadInstance>()

const customHttpRequest: (
  options: UploadRequestOptions
) => XMLHttpRequest | Promise<unknown> = async (options) => {}
</script>

<style scoped></style>
