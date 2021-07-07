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

    <v-chart class="chart" :option="ReqPerSecLineOption" autoresize />
    <v-chart class="chart" :option="ReqPerSecBarOption" autoresize />

    <v-chart class="chart" :option="BytesPerSecLineOption" autoresize />
    <v-chart class="chart" :option="BytesPerSecBarOption" autoresize />
    <v-chart class="chart" :option="LatencyLineOption" autoresize />
  </div>
</template>

<script>
import copyTextMixin from '@/mixins/copyTextMixin'

import VChart, { THEME_KEY } from 'vue-echarts'
import merge from 'lodash/merge'
import {
  chartDataMap,
  legendData,
} from '@/dataSource/chart/scf-event-vs-web-vs-custom-image'
const connectionArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

const defaultsOption = {
  title: {
    top: 20,
    left: 20,
  },
  tooltip: {
    trigger: 'item',
  },
  grid: {
    top: 120,
  },
  toolbox: {
    top: 20,
    right: 20,
    feature: {
      dataZoom: {},
      restore: {},
      saveAsImage: {},
    },
  },
}

function mergeBaseOption(option) {
  return merge({}, defaultsOption, option)
}

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
      ReqPerSecLineOption: mergeBaseOption({
        title: {
          text: 'Req/Sec 平均折线图',
          // left: 'center',
        },
        dataZoom: [
          {
            show: true,
            type: 'slider',
            realtime: true,
            start: 0,
            end: 100,
          },
          {
            show: true,
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100,
          },
        ],
        legend: {
          orient: 'horizontal',
          top: 60,
          // left: 'left',
          data: legendData,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: connectionArray,
        },
        yAxis: {
          type: 'value',
        },
        series: legendData.map((x) => {
          // console.log(chartDataMap[x])
          return {
            name: x,
            type: 'line',
            emphasis: {
              focus: 'series',
              label: {
                show: true,
                position: 'top',
              },
            },
            smooth: true,
            data: chartDataMap[x].ReqPerSec.data,
          }
        }),
      }),
      ReqPerSecBarOption: mergeBaseOption({
        title: {
          text: 'Req/Sec 平均累加柱状图',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {
          orient: 'horizontal',
          top: 60,
          // left: 'left',
          data: connectionArray.map((x) => {
            return x.toString()
          }),
        },
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'category',
          data: legendData,
        },
        grid: {
          top: 120,
          left: 200,
        },
        series: connectionArray.map((x, idx) => {
          return {
            name: x.toString(),
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: legendData.reduce((acc, cur) => {
              acc.push(chartDataMap[cur].ReqPerSec.data[idx])

              return acc
            }, []),
          }
        }),
      }),
      BytesPerSecLineOption: mergeBaseOption({
        title: {
          text: 'Bytes/Sec 吞吐量(KB)平均折线图',
          // left: 'center',
        },
        dataZoom: [
          {
            show: true,
            type: 'slider',
            realtime: true,
            start: 0,
            end: 100,
          },
          {
            show: true,
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100,
          },
        ],
        legend: {
          orient: 'horizontal',
          top: 60,
          // left: 'left',
          data: legendData,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: connectionArray,
        },
        yAxis: {
          type: 'value',
        },
        series: legendData.map((x) => {
          // console.log(chartDataMap[x])
          return {
            name: x,
            type: 'line',
            emphasis: {
              focus: 'series',
              label: {
                show: true,
                position: 'top',
              },
            },
            smooth: true,
            data: chartDataMap[x].BytesPerSec.data,
          }
        }),
      }),
      BytesPerSecBarOption: mergeBaseOption({
        title: {
          text: 'Bytes/Sec 吞吐量(KB)平均累加柱状图',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {
          orient: 'horizontal',
          top: 60,
          // left: 'left',
          data: connectionArray.map((x) => {
            return x.toString()
          }),
        },
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'category',
          data: legendData,
        },
        grid: {
          top: 120,
          left: 200,
        },
        series: connectionArray.map((x, idx) => {
          return {
            name: x.toString(),
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: legendData.reduce((acc, cur) => {
              acc.push(chartDataMap[cur].BytesPerSec.data[idx])

              return acc
            }, []),
          }
        }),
      }),
      LatencyLineOption: mergeBaseOption({
        title: {
          text: 'Latency 延迟平均折线图',
          // left: 'center',
        },
        dataZoom: [
          {
            show: true,
            type: 'slider',
            realtime: true,
            start: 0,
            end: 100,
          },
          {
            show: true,
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100,
          },
        ],
        legend: {
          orient: 'horizontal',
          top: 60,
          // left: 'left',
          data: legendData,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: connectionArray,
        },
        yAxis: {
          type: 'value',
        },
        series: legendData.map((x) => {
          // console.log(chartDataMap[x])
          return {
            name: x,
            type: 'line',
            emphasis: {
              focus: 'series',
              label: {
                show: true,
                position: 'top',
              },
            },
            smooth: true,
            data: chartDataMap[x].Latency.data,
          }
        }),
      }),
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.chart {
  height: 600px;
}
</style>
