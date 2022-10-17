<template>
  <div class="container mx-auto">
    <div>
      <div>pub bucket</div>
      <SupabaseUpload bucket="pub" v-model:file-list="pubFileList">
        <template #trigger>
          <el-button type="primary">pub upload</el-button>
        </template>
      </SupabaseUpload>
    </div>

    <div>
      <div>self bucket</div>
      <SupabaseUpload bucket="self" v-model:file-list="selfFileList">
        <template #trigger>
          <el-button type="primary">self upload</el-button>
        </template>
      </SupabaseUpload>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UploadProps, UploadUserFile } from 'element-plus'
const pubFileList = ref<UploadUserFile[]>([])
const selfFileList = ref<UploadUserFile[]>([])
</script>

<style scoped></style>
