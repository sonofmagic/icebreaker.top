<template>
  <div class="container mx-auto space-y-2">
    <div>route:{{ $route.query.v }}</div>
    <canvas v-show="!offscreen" ref="canvasEl"></canvas>

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

          {{ statusText }}
        </div>
        <div class="flex space-x-2">
          <div>生成个数:{{ count }}</div>
          <div>总耗时(ms):{{ costMs }}</div>
        </div>
        <h2 class="text-2xl text-primary-900">STORE(no compression)</h2>
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

        <h2 class="text-2xl text-primary-900">STORE(no compression)</h2>
        <h3>11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz 1.69 GHz</h3>
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
              <td class="primary-td">166.50</td>
              <td class="primary-td">6.70</td>
              <td class="primary-td">173.20</td>
            </tr>
            <tr class="hover:bg-primary-200">
              <td class="primary-td">100</td>
              <td class="primary-td">1665.00</td>
              <td class="primary-td">43.40</td>
              <td class="primary-td">1708.40</td>
            </tr>
            <tr class="hover:bg-primary-200">
              <td class="primary-td">1000</td>
              <td class="primary-td">16706.50</td>
              <td class="primary-td">358.10</td>
              <td class="primary-td">17064.60</td>
            </tr>
          </tbody>
        </table>
        <h2 class="text-2xl text-primary-900">DEFLATE(9 level)</h2>
        <h3>11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz 1.69 GHz</h3>
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
              <td class="primary-td">166.70</td>
              <td class="primary-td">33.10</td>
              <td class="primary-td">199.80</td>
            </tr>
            <tr class="hover:bg-primary-200">
              <td class="primary-td">100</td>
              <td class="primary-td">1662.60</td>
              <td class="primary-td">142.20</td>
              <td class="primary-td">1804.80</td>
            </tr>
            <tr class="hover:bg-primary-200">
              <td class="primary-td">1000</td>
              <td class="primary-td">16672.40</td>
              <td class="primary-td">964.30</td>
              <td class="primary-td">17636.70</td>
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
      statusText: '', // 压缩中
      num: 0,
      buttonDisabled: false,
      offscreen: true,
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.num += 1
    }, 1000)
    // if (window.Worker) {
    //   const ZipWorker = require('@/workers/zip.worker.js').default
    //   this.worker = new ZipWorker()
    //   /**
    //    * @type {Worker} worker
    //    */
    //   const worker = this.worker
    //   // worker.postMessage({})
    //   worker.onmessage = (event) => {
    //     console.log(event)
    //   }

    //   //       const offscreen = document.querySelector('canvas').transferControlToOffscreen();
    //   // const worker = new Worker('myworkerurl.js');
    //   // worker.postMessage({ canvas: offscreen }, [offscreen]);
    // }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.num = 0
  },
  methods: {
    reset() {
      this.percent = 0
      this.statusText = ''
    },
    async download() {
      this.buttonDisabled = true
      try {
        this.reset()
        this.statusText = '生成中'
        const t0 = performance.now()
        const zip = new JSZip()
        const eachP = 50 / this.count
        for (let i = 0; i < this.count; i++) {
          const canvas = await QRCode.toCanvas(
            this.$refs.canvasEl,
            'https://www.icebreaker.top/batch/qrcode?v=' + i,
            {
              margin: 0,
              // errorCorrectionLevel: 'H',
              // version:
            }
          )
          const filename = `qrcode${i}.png`
          this.statusText = `生成${filename}中`
          await new Promise((resolve) => {
            canvas.toBlob((blob) => {
              zip.file(filename, blob)
              resolve()
            })
          })
          this.percent += eachP
        }
        this.statusText = '压缩中'
        const t1 = performance.now()
        const content = await zip.generateAsync(
          {
            type: 'blob',
            // compression: 'DEFLATE',
            // compressionOptions: {
            //   level: 9,
            // },
          },
          (metadata) => {
            // console.log('progression: ' + metadata.percent.toFixed(2) + ' %')
            this.percent = 50 + metadata.percent / 2
            if (metadata.currentFile) {
              this.statusText = `压缩${metadata.currentFile}中`
            }
          }
        )
        saveAs(content, 'qrcodes.zip')
        this.statusText = '生成成功!'
        const t2 = performance.now()
        const totalCostTime = (t2 - t0).toFixed(2)
        console.log(
          `生成时间:${(t1 - t0).toFixed(2)},压缩时间:${(t2 - t1).toFixed(
            2
          )},总耗时:${totalCostTime}`
        )
        this.costMs = totalCostTime
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
  @apply border border-border-default px-4 py-2 text-fg-default font-medium;
}
</style>
