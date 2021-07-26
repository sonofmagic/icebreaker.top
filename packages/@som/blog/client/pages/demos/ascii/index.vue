<template>
  <div>
    <div class="container mx-auto">
      <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" />
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'AsciiIndex',
  data() {
    return {
      fileList: [],
    }
  },
  methods: {
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
