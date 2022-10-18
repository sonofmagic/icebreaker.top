<template>
  <div class="container mx-auto">
    <div>
      <div>pub bucket</div>
      <SupabaseUpload
        bucket="pub"
        policy="public"
        :path-format="pubPathFormat"
        v-model="pubFileList"
        :list-type="'picture-card'"
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
        v-model="selfFileList"
        :list-type="'picture-card'"
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
const pubFileList = ref<
  (UploadUserFile & { bucket?: string; path?: string })[]
>([
  {
    name: 'AAA',
    bucket: 'pub',
    path: '8737a2e5-1c96-4d5e-a2fe-c8f2850cec8f/cbMSnzKMq0YdDuaLCdFoz.png'
  }
])
const selfFileList = ref<
  (UploadUserFile & { bucket?: string; path?: string })[]
>([
  {
    name: 'AAA',
    bucket: 'self',
    path: '8737a2e5-1c96-4d5e-a2fe-c8f2850cec8f/Sw3pD_7POk8UsA60El2Xs.jpg'
  }
])
const { user } = useUserStoreRefs()
const pubPathFormat = (file: File): string => {
  const extname = path.extname(file.name)
  return `${user.value?.id}/${nanoid()}${extname}`
}

const selfPathFormat = (file: File): string => {
  const extname = path.extname(file.name)
  return `${user.value?.id}/${nanoid()}${extname}`
}

// message
// :
// "new row violates row-level security policy for table \"objects\""
// statusCode
// :
// "42501"
</script>

<style scoped></style>
