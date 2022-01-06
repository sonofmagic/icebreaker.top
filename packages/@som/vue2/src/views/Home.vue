<template>
  <div class="home">
    <Chart :data="data"></Chart>
  </div>
</template>

<script lang="ts">
import Chart from '@/components/vue-d3-org-chart/index'
import Vue from 'vue'
import * as d3 from 'd3'
import type { DSVRowArray } from 'd3'
export default Vue.extend({
  name: 'Home',
  components: {
    Chart
  },
  data (): {
    data?: DSVRowArray<string>
    } {
    return {
      data: undefined
    }
  },
  created () {
    d3.csv('org.csv').then((d) => {
      // console.log(d)
      this.data = d
    })
  }
})
</script>
