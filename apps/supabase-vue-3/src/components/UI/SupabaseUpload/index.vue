<template>
  <el-upload
    v-model:file-list="fileList"
    ref="uploadRef"
    action=""
    :http-request="customHttpRequest"
  >
    <template>
      <slot></slot>
    </template>
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
  UploadUserFile,
  UploadRequestOptions
} from 'element-plus'
const uploadRef = ref<UploadInstance>()
const supabase = useSupabaseClient()
const props = withDefaults(
  defineProps<{
    modelValue?: UploadUserFile[]
    bucket: string
    pathFormat?: (file: File, options: UploadRequestOptions) => string
  }>(),
  {
    modelValue: () => [],
    pathFormat: (file: File) => file.name
  }
)

const emit = defineEmits(['update:modelValue'])

const fileList = computed<UploadUserFile[]>({
  get() {
    return props.modelValue
  },
  set(nv) {
    emit('update:modelValue', nv)
  }
})

const customHttpRequest: (
  options: UploadRequestOptions
) => XMLHttpRequest | Promise<unknown> = async (options) => {
  console.log(options)
  const { onSuccess, onError } = options
  const { data, error } = await supabase.storage
    .from(props.bucket)
    .upload(props.pathFormat(options.file, options), options.file)
  if (error) {
    // @ts-ignore
    onError(error)
  } else {
    onSuccess(data)
  }
}
</script>

<style scoped></style>
