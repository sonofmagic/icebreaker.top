<template>
  <div>
    <div class="container mx-auto">
      <div>
        <van-uploader
          ref="uploadCom"
          v-model="fileList"
          :max-count="1"
          :after-read="afterRead"
        />
        <van-button :loading="loading" type="primary" @click="uploadImg"
          >上传</van-button
        >
      </div>
      <pre>{{ ascii }}</pre>
      <!-- <div v-html="ascii"></div> -->
    </div>
  </div>
</template>

<script>
import { upload2Ascii, upload2Bit, upload2Ascii2 } from '@/api/upload'
import { Toast } from 'vant'
import parser from 'ansi-style-parser'
import { parse } from 'ansicolor'
// const { parse } = require ('ansicolor')
// import Convert from 'ansi-to-html'

async function getImgSize(blob) {
  const img = document.createElement('img')
  img.src = URL.createObjectURL(blob)
  return await new Promise((resolve, reject) => {
    img.onload = () => {
      const { width, height } = img
      console.log(img)
      resolve({
        width,
        height,
        scale: width / height,
      })
    }
    img.onerror = (e) => {
      reject(e)
    }
  })
}

export default {
  name: 'AsciiIndex',
  data() {
    return {
      fileList: [],
      loading: false,
      ascii: '',
      width: 200,
      height: 100,
    }
  },
  methods: {
    async uploadImg() {
      try {
        this.loading = true
        const { scale } = await getImgSize(this.fileList[0].file)
        const width = 50
        const height = width / scale
        // this.width / scale
        // console.log(size)
        const res = await upload2Ascii2(this.fileList[0].file, {
          width,
          height,
        })
        // // const convert = new Convert()
        const parsed = parse(res.data)
        console.log(...parsed.asChromeConsoleLogArguments)
        this.ascii = res.data // convert.toHtml(res.data)
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
