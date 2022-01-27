<template>
  <div>
    <v-chart
      ref="svgRef"
      class="chart"
      :option="option"
      :init-options="{
        renderer: 'svg',
      }"
    />
    <!-- <v-chart ref="canvasRef" class="chart" :option="option" /> -->
  </div>
</template>

<script lang="ts">
import VChart, { THEME_KEY } from 'vue-echarts'
import { defineComponent, ref, onMounted } from 'vue'
import type { EChartsOption } from 'echarts'
import * as d3 from 'd3'
export default defineComponent({
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: 'dark'
  },
  setup () {
    // dataZoom
    // const canvasRef = ref()
    const svgRef = ref()
    const option = ref<EChartsOption>({
      title: {
        text: 'Traffic Sources',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      // legend: {
      //   orient: 'vertical',
      //   left: 'left',
      //   data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines']
      // },
      series: [
        {
          name: 'Traffic Sources',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: 'Direct' },
            { value: 310, name: 'Email' },
            { value: 234, name: 'Ad Networks' },
            { value: 135, name: 'Video Ads' },
            { value: 1548, name: 'Search Engines' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
    onMounted(() => {
      const svg = d3.select(svgRef.value.$el).select<Element>('svg')
      const g = svg.select<Element>('g:nth-child(2)')

      svg.call(
        d3
          .zoom()
          .scaleExtent([0.25, 8])
          .on('zoom', ({ transform }) => {
            g.attr('transform', transform)
          })
      )

      // const canvas = d3
      //   .select(canvasRef.value.$el)
      //   .select<Element>('canvas')
      //   .node() as HTMLCanvasElement

      // const context = canvas.getContext('2d')
      // function zoomed(transform) {
      //   context.save()
      //   context.clearRect(0, 0, canvas.width, canvas.height)
      //   context.translate(transform.x, transform.y)
      //   context.scale(transform.k, transform.k)
      //   context.beginPath()
      //   for (const [x, y] of data) {
      //     context.moveTo(x + r, y)
      //     context.arc(x, y, r, 0, 2 * Math.PI)
      //   }
      //   context.fill()
      //   context.restore()
      // }
      // console.log(context)
    })
    // canvasRef,
    return { option, svgRef }
  }
})
</script>

<style scoped>
.chart {
  height: 600px;
}
</style>
