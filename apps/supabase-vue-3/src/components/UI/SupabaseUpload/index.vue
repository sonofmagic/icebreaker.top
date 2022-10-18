<template>
  <el-upload
    v-model:file-list="fileList"
    ref="uploadRef"
    action=""
    :http-request="customHttpRequest"
    :list-type="props.listType"
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
  UploadRequestOptions,
  UploadFile,
  UploadFiles
} from 'element-plus'

const uploadRef = ref<UploadInstance>()
const supabase = useSupabaseClient()
const props = withDefaults(
  defineProps<{
    modelValue?: (UploadUserFile & { bucket?: string; path?: string })[]
    bucket: string
    pathFormat?: (file: File, options?: UploadRequestOptions) => string
    onSuccess?: UploadProps['onSuccess']
    listType?: UploadProps['listType']
    policy?: 'public' | 'private'
  }>(),
  {
    modelValue: () => [],
    pathFormat: (file: File) => file.name,
    policy: 'private'
  }
)

const emit = defineEmits(['update:modelValue'])

const getPublicUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
const createSignedUrl = async (bucket: string, path: string) => {
  // half an hour
  const { data } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, 60 * 30)
  return data?.signedUrl
}

const fileList = computed<UploadUserFile[]>({
  get() {
    return props.modelValue
  },
  set(nv) {
    emit('update:modelValue', nv)
  }
})
onMounted(() => {
  props.modelValue.forEach((x) => {
    if (x.bucket && x.path && !x.url) {
      if (props.policy === 'public') {
        x.url = getPublicUrl(x.bucket, x.path)
      } else {
        createSignedUrl(x.bucket, x.path).then((url) => {
          x.url = url
        })
      }
    }
  })
})

const customHttpRequest: (
  options: UploadRequestOptions
) => XMLHttpRequest | Promise<unknown> = async (options) => {
  const { file } = options
  const { data, error } = await supabase.storage
    .from(props.bucket)
    .upload(props.pathFormat(file, options), file)
  if (error) {
    // @ts-ignore
    // onError(error)
    throw error
  } else {
    // // @ts-ignore
    // file.path = data.path
    // // @ts-ignore
    // file.bucket = props.bucket
    // onSuccess(data)
    // @ts-ignore
    data.bucket = props.bucket
    return data
  }
}

// const onSuccess: (
//   response: any,
//   uploadFile: UploadFile,
//   uploadFiles: UploadFiles
// ) => void = (data, uploadFile, uploadFiles) => {
//   console.log(data, uploadFile, uploadFiles)
//   // @ts-ignore
//   uploadFile.bucket = props.bucket
//   debugger
//   // @ts-ignore
//   uploadFile.path = data.path
// }

// const onError: (
//   error: Error,
//   uploadFile: UploadFile,
//   uploadFiles: UploadFiles
// ) => void = (error, uploadFile, uploadFiles) => {
//   console.log(error, uploadFile, uploadFiles)
// }
</script>

<style scoped></style>
