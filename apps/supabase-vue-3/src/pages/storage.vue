<template>
  <div>
    <SupabaseUpload v-model:file-list="fileList">
      <template #trigger>
        <el-button type="primary">Click to upload</el-button>
      </template>
    </SupabaseUpload>
  </div>
</template>

<script setup lang="ts">
import type { UploadProps, UploadUserFile } from 'element-plus'
const fileList = ref<UploadUserFile[]>([])
</script>

<style scoped></style>
