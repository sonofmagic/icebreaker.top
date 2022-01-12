<template>
  <div class="home">
    <Chart :dataSource="dataSource">
      <!-- <template v-slot="{ node, data }">
        <div>{{ data.id }}</div>
        <div>{{ node.level }}</div>
      </template> -->
    </Chart>
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
    dataSource?: DSVRowArray<string>
    } {
    return {
      dataSource: undefined
    }
  },
  created () {
    d3.csv('org.csv').then((d) => {
      // console.log(d)
      this.dataSource = d
    })
  }
})
</script>
