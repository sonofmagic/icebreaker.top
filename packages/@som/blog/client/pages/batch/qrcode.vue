<template>
  <div class="container mx-auto space-y-2">
    <div>route:{{$route.query.v}}</div>
    <canvas
      v-show="false"
      ref="canvasEl"
    ></canvas>
    <div class="text-2xl">JS主线程</div>
    <div>宏任务:{{num}}</div>
    <div>
      <label>设置个数:</label>
      <span class="border border-primary-600 border-solid py-1">
        <input v-model.number="count" />个
      </span>
    </div>

    <div>
      <button
        class="rounded bg-primary-600 text-white px-2 py-1"
        @click="download"
      >点击此处下载</button>
      <span>处理进度:</span>
      <progress
        max="100"
        :value="percent"
      > {{percent}}% </progress>

      {{status}}

    </div>
    <div class="flex space-x-2">
      <div>生成个数:{{count}}</div>
      <div>耗时(ms):{{costMs}}</div>
    </div>
    <table class="border-collapse ">
      <thead>
        <tr>
          <th>参考个数</th>
          <th>参考时间</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-primary-200">
          <td class="primary-td">10</td>
          <td class="primary-td">197ms</td>
        </tr>
        <tr class="hover:bg-primary-200">
          <td class="primary-td">100</td>
          <td class="primary-td">1819ms</td>
        </tr>
        <tr class="hover:bg-primary-200">
          <td class="primary-td">1000</td>
          <td class="primary-td">17764ms</td>
        </tr>

      </tbody>
    </table>

  </div>
</template>

<script>
import { saveAs } from 'file-saver'
import QRCode from 'qrcode'
import JSZip from 'jszip'
// js主线程
// 10个 197ms
// 100 个 1819ms
// 1000 个17764ms

export default {
  name: 'BatchDownloadQrcodes',
  components: {},
  data() {
    return {
      count: 1000,
      costMs: 0,
      percent: 0, //50 添加 50 压缩
      status: '', //压缩中
      num: 0,
    }
  },
  methods: {
    reset() {
      this.percent = 0
      this.status = ''
    },
    async download() {
      this.reset()
      this.status = '生成中'
      const start = Date.now()
      const zip = new JSZip()
      const eachP = 100 / this.count
      for (let i = 0; i < this.count; i++) {
        const canvas = await QRCode.toCanvas(
          this.$refs.canvasEl,
          'https://www.icebreaker.top/batch/qrcode?v=' + i,
          {
            margin: 0,
          }
        )
        await new Promise((resolve) => {
          canvas.toBlob((blob) => {
            zip.file(`qrcode${i}.png`, blob)
            resolve()
          })
        })
        this.percent += eachP
      }
      const content = await zip.generateAsync({ type: 'blob' })
      saveAs(content, 'qrcodes.zip')
      this.status = '生成成功!'
      const end = Date.now()
      this.costMs = end - start
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      this.num += 1
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.num = 0
  },
}
</script>
<style lang="scss" scoped>
.primary-td {
  @apply border border-primary-500 px-4 py-2 text-primary-600 font-medium;
}
</style>
