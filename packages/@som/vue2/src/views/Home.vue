<template>
  <!-- <div class="home">
    <Chart :dataSource="dataSource">
      <template v-slot="{ node, data }">
        <div>{{ data.id }}</div>
        <div>{{ node.level }}</div>
      </template>
    </Chart>
  </div> -->
  <!-- <Demo></Demo> -->
  <div>
    <TestInput :options="options"></TestInput>
    <button @click="options.de++">++</button>
  </div>
</template>

<script lang="ts">
import Demo from '@/components/Github/Demo.vue'
// import Chart from '@/components/vue-d3-org-chart/index'
import Vue from 'vue'
// import * as d3 from 'd3'
// import type { DSVRowArray } from 'd3'
// const defaultValueFormData = fn(formData)

// formOnChange({path,value}){
//  const defaultValue =  get(defaultValueFormData,path)
//  set(formData,path,handleValue(defaultValue,value))
// }

// reset(){
//   merge(formData,defaultValueFormData)
// }

import TestInput from '@/components/Input/index.vue'
export default Vue.extend({
  components: {
    Demo,
    TestInput
  },
  data () {
    return {
      options: {
        v: 1,
        de: 2
      }
    }
  }
  // name: 'Home',
  // components: {
  //   Chart
  // },
  // data (): {
  //   dataSource?: DSVRowArray<string>
  //   } {
  //   return {
  //     dataSource: undefined
  //   }
  // },
  // created () {
  //   d3.csv('org.csv').then((d) => {
  //     console.log(d)
  //     this.dataSource = d
  //   })
  // }
})
</script>
