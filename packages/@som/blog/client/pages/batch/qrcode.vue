<template>
  <div class="container mx-auto space-y-2">
    <div>route:{{ $route.query.v }}</div>
    <canvas v-show="false" ref="canvasEl"></canvas>

    <div>宏任务:{{ num }}</div>

    <div class="space-y-4">
      <div class="border border-solid border-primary-600 p-2 rounded">
        <div class="text-2xl">JS主线程</div>
        <div>
          <label>设置个数:</label>
          <span class="border border-primary-600 border-solid py-1">
            <input v-model.number="count" :disabled="buttonDisabled" />个
          </span>
        </div>

        <div>
          <button
            class="rounded bg-primary-600 text-white px-2 py-1 disabled:cursor-not-allowed disabled:opacity-75"
            :disabled="buttonDisabled"
            @click="download"
          >
            点击此处下载
          </button>
          <!-- <button @click="postMsg">Worker test</button> -->
          <span>处理进度:</span>
          <progress max="100" :value="percent">{{ percent }}%</progress>

          {{ status }}
        </div>
        <div class="flex space-x-2">
          <div>生成个数:{{ count }}</div>
          <div>总耗时(ms):{{ costMs }}</div>
        </div>
        <table class="border-collapse">
          <thead>
            <tr>
              <th>参考个数</th>
              <th>生成时间(ms)</th>
              <th>压缩时间(ms)</th>
              <th>总时间(ms)</th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover:bg-primary-200">
              <td class="primary-td">10</td>
              <td class="primary-td">185.30</td>
              <td class="primary-td">20.30</td>
              <td class="primary-td">205.60</td>
            </tr>
            <tr class="hover:bg-primary-200">
              <td class="primary-td">100</td>
              <td class="primary-td">1711.60</td>
              <td class="primary-td">144.30</td>
              <td class="primary-td">1855.90</td>
            </tr>
            <tr class="hover:bg-primary-200">
              <td class="primary-td">1000</td>
              <td class="primary-td">17097</td>
              <td class="primary-td">1210.90</td>
              <td class="primary-td">18307.90</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
import QRCode from 'qrcode'
import JSZip from 'jszip'
import Worker from '@/workers/zip.worker.js'
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
      percent: 0, // 50 添加 50 压缩
      status: '', // 压缩中
      num: 0,
      buttonDisabled: false,
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.num += 1
    }, 1000)
    const worker = (this.worker = new Worker())

    worker.onmessage = (event) => {
      console.log(event)
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.num = 0
  },
  methods: {
    reset() {
      this.percent = 0
      this.status = ''
    },
    async download() {
      this.buttonDisabled = true
      try {
        this.reset()
        this.status = '生成中'
        const t0 = performance.now()
        const zip = new JSZip()
        const eachP = 50 / this.count
        for (let i = 0; i < this.count; i++) {
          const canvas = await QRCode.toCanvas(
            this.$refs.canvasEl,
            'https://www.icebreaker.top/batch/qrcode?v=' + i,
            {
              margin: 0,
            }
          )
          const filename = `qrcode${i}.png`
          this.status = `生成${filename}中`
          await new Promise((resolve) => {
            canvas.toBlob((blob) => {
              zip.file(filename, blob)
              resolve()
            })
          })
          this.percent += eachP
        }
        this.status = '压缩中'
        const t1 = performance.now()
        const content = await zip.generateAsync(
          { type: 'blob' },
          (metadata) => {
            // console.log('progression: ' + metadata.percent.toFixed(2) + ' %')
            this.percent = 50 + metadata.percent / 2
            if (metadata.currentFile) {
              this.status = `压缩${metadata.currentFile}中`
            }
          }
        )
        saveAs(content, 'qrcodes.zip')
        this.status = '生成成功!'
        const t2 = performance.now()
        this.costMs = t2 - t0
        console.log(`生成时间:${t1 - t0},压缩时间:${t2 - t1}`)
      } catch (error) {
        console.error(error)
      } finally {
        this.buttonDisabled = false
      }
    },
    postMsg() {
      this.worker.postMessage({ postMessage: true })
    },
  },
}
</script>
<style lang="scss" scoped>
.primary-td {
  @apply border border-primary-500 px-4 py-2 text-primary-600 font-medium;
}
</style>
