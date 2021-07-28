<template>
  <div>
    <div class="container mx-auto">
      <div>
        <van-uploader
          v-model="fileList"
          :max-count="1"
          :after-read="afterRead"
        />
        <van-button :loading="loading" type="primary" @click="uploadImg"
          >上传</van-button
        >
      </div>
      <pre>{{ ascii }}</pre>
    </div>
  </div>
</template>

<script>
import { upload2Ascii, upload2Bit } from '@/api/upload'
import { Toast } from 'vant'
export default {
  name: 'AsciiIndex',
  data() {
    return {
      fileList: [],
      loading: false,
      ascii: '',
    }
  },
  methods: {
    async uploadImg() {
      try {
        this.loading = true
        const res = await upload2Bit(this.fileList[0].file)
        this.ascii = res.data
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }

      // console.log(res.data)
    },
    afterRead(file) {
      console.log(file)
      // this.file = file
    },
    onOversize(file) {
      console.log(file)
      Toast('文件大小不能超过 10M')
      return true
    },
  },
}
</script>

<style></style>
