<template>
  <div class="container mx-auto">
    <div>
      <div>pub bucket</div>
      <SupabaseUpload
        bucket="pub"
        :path-format="pubPathFormat"
        v-model:file-list="pubFileList"
      >
        <template #trigger>
          <el-button type="primary">pub upload</el-button>
        </template>
      </SupabaseUpload>
    </div>

    <div>
      <div>self bucket</div>
      <SupabaseUpload
        bucket="self"
        :path-format="selfPathFormat"
        v-model:file-list="selfFileList"
      >
        <template #trigger>
          <el-button type="primary">self upload</el-button>
        </template>
      </SupabaseUpload>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UploadProps, UploadUserFile } from 'element-plus'
import path from 'path-browserify'
import { nanoid } from 'nanoid'
const pubFileList = ref<UploadUserFile[]>([])
const selfFileList = ref<UploadUserFile[]>([])
const { user } = useUserStoreRefs()
const pubPathFormat = (file: File): string => {
  const extname = path.extname(file.name)
  return `${user.value?.id}/${nanoid()}${extname}`
}

const selfPathFormat = (file: File): string => {
  const extname = path.extname(file.name)
  return `${user.value?.id}/${nanoid()}${extname}`
}
</script>

<style scoped></style>
