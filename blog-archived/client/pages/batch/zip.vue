<script>
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import testJpg from '@/assets/img/mini/programer-card.jpg' // '@/assets/img/test.jpg' // '@/assets/img/mini/programer-card.jpg'
// 2227kb 的图片，
// 最高压缩 2226ms 16.2mb
// 不压缩 1183ms 也要 16mb?
export default {
  name: 'TestZip',
  layout: 'empty',
  data() {
    return {
      // testJpg,
      percentage: 0,
    }
  },
  mounted() {
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = (this.canvas = this.$refs.canvas)

    const ctx = canvas.getContext('2d')

    const image = new Image()
    image.src = testJpg
    image.onload = () => {
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      ctx.drawImage(image, 0, 0)
    }
  },
  methods: {
    async download() {
      this.percentage = 0
      const t0 = performance.now()
      const zip = new JSZip()
      const filename = 'test.png'
      await new Promise((resolve) => {
        this.canvas.toBlob((blob) => {
          zip.file(filename, blob)
          resolve()
        })
      })
      this.percentage += 50
      const t1 = performance.now()
      const content = await zip.generateAsync(
        {
          type: 'blob',
          compression: 'DEFLATE',
          compressionOptions: {
            level: 9,
          },
        },
        ({ percent, currentFile }) => {
          // console.log(percent, currentFile)
          this.percentage = 50 + percent / 2
        },
      )
      saveAs(content, 'test-jpg.zip')
      const t2 = performance.now()
      const generateTs = (t1 - t0).toFixed(2)
      const zipTs = (t2 - t1).toFixed(2)
      const totalTs = (t2 - t0).toFixed(2)
      console.log(
        `生成时间:${generateTs}ms 压缩时间:${zipTs}ms 总耗时:${totalTs}ms`,
      )
    },
  },
}
</script>

<template>
  <div>
    <canvas v-show="false" ref="canvas" />
    <button @click="download">
      download
    </button>
    <el-progress :percentage="percentage" />
    <!-- <img :src="testJpg" /> -->
  </div>
</template>

<style lang="scss" scoped></style>
