<template>
  <div class="container mx-auto">
    <div class="space-y-2 mb-6">
      <van-notice-bar
        left-icon="volume-o"
        text="本压测用例，基于express返回最简单的请求，编写而成"
      />
      <div>
        <div class="flex items-center">
          <FontAwesomeIcon class="mr-2" :icon="['fab', 'github']" />
          <span class="text-xl">Github地址:</span>
        </div>
        <div
          class="text-xs underline cursor-pointer"
          @click.stop="
            copyText(
              'https://github.com/sonofmagic/tencent-web-function-benchmark'
            )
          "
        >
          https://github.com/sonofmagic/tencent-web-function-benchmark(点击复制)
        </div>
      </div>
    </div>

    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script>
import copyTextMixin from '@/mixins/copyTextMixin'

import VChart, { THEME_KEY } from 'vue-echarts'

import { legendData } from './dataSource'

export default {
  components: {
    VChart,
  },
  mixins: [copyTextMixin],
  provide: {
    [THEME_KEY]: 'dark',
  },
  data() {
    return {
      option: {
        title: {
          text: 'Req/Sec 平均折线图',
          left: 'center',
        },
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b} : {c} ({d}%)',
        // },
        // legend: {
        //   orient: 'vertical',
        //   left: 'left',
        //   data: legendData,
        // },
        series: [
          {
            // name: 'Traffic Sources',
            // type: 'pie',
            // radius: '55%',
            // center: ['50%', '60%'],
            // data: [
            //   { value: 335, name: 'Direct' },
            //   { value: 310, name: 'Email' },
            //   { value: 234, name: 'Ad Networks' },
            //   { value: 135, name: 'Video Ads' },
            //   { value: 1548, name: 'Search Engines' },
            // ],
            // emphasis: {
            //   itemStyle: {
            //     shadowBlur: 10,
            //     shadowOffsetX: 0,
            //     shadowColor: 'rgba(0, 0, 0, 0.5)',
            //   },
            // },
          },
        ],
      },
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.chart {
  height: 400px;
}
</style>
