<template>
  <div>
    <div>I am a Svg!</div>
    <div ref="dom">

    </div>
  </div>
</template>

<script >
import Vue from 'vue'
import * as d3 from 'd3'
import TestVue from '@/components/vue-d3-org-chart/Test.vue'
export default Vue.extend({
  mounted () {
    const matrix = [
      [11975, 5871, 8916, 2868],
      [1951, 10048, 2060, 6171],
      [8010, 16145, 8090, 8045],
      [1013, 990, 940, 6907]
    ]
    d3.select(this.$refs.dom)
      .append('div')
      .selectAll('div')
      .data(matrix)
      .join('div')
      .style('display', 'flex')
      .selectAll('div')
      .data((d) => d)
      .join('div')
      .style('width', '150px')
      .text((d) => d + ' from d3!')
      .append(function (d, i, g) {
        return document.createElement('div')
      })
      .each(function (d, i, g) {
        const app = new Vue({
          render (h) {
            return h(TestVue, {
              props: {
                data: d
              }
            })
          }
        })
        app.$mount(this)
      })
  }
})
</script>

<style>
</style>
