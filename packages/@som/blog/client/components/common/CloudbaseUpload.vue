<template>
  <el-upload
    action=""
    :http-request="handleUpload"
    :show-file-list="false"
    :limit="1"
    v-bind="$attrs"
    :file-list="value"
    :before-upload="beforeUpload"
    :on-success="onSuccess"
    v-on="$listeners"
  >
    <template #default>
      <slot></slot>
    </template>
    <template #trigger>
      <slot name="trigger"></slot>
    </template>
    <template #tip>
      <slot name="tip"></slot>
    </template>
  </el-upload>
</template>

<script>
// $attrs $listeners
// import COS from 'cos-js-sdk-v5'
// Cos or Cloudbase
import { mapGetters } from 'vuex'
const allowExtensions = ['png', 'jpg', 'jpeg']
const maxMB = 5
const maxFileSize = 1024 * 1024 * maxMB // 5M
const prefix = `www/${process.env.SLS_ENV}`
export default {
  name: 'CloudbaseUpload',
  props: {
    value: {
      type: [Array],
      default: () => [],
    },
  },
  computed: {
    ...mapGetters('user', ['user', 'isLogined']),
  },
  methods: {
    async handleUpload(option) {
      const { file } = option
      // size, type, uid
      const { name } = file
      return await this.$cloudbase.uploadFile({
        cloudPath: `${prefix}/${this.user.uid}/${name}`,
        filePath: file,
        onUploadProgress(e) {
          if (e.total > 0) {
            e.percent = (e.loaded / e.total) * 100
          }
          option.onProgress(e)
        },
      })
    },
    onSuccess(response, file, fileList) {
      // console.log(response, file, fileList)
      this.$emit('input', fileList)
      this.$emit('success', response, file, fileList)
    },
    beforeUpload(file) {
      // type, uid
      if (!this.isLogined) {
        this.$message.warning('请先登录才能上传!')
        return false
      }
      const { name, size } = file
      const extension = name.substring(name.lastIndexOf('.') + 1).toLowerCase()
      if (allowExtensions.includes(extension)) {
        if (size > maxFileSize) {
          this.$message.warning(`仅支持小于${maxMB}M的文件！`)
          return false
        }
      } else {
        this.$message.warning(`只能上传${allowExtensions.join(',')}格式文件`)
        return false
      }
    },
  },
}
</script>

<style></style>
