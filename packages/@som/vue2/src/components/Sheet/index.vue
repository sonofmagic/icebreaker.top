<template>
  <div class="w-[1280px] overflow-auto">
    <table class="w-auto">
      <tbody>
        <tr :key="i" v-for="(row,i) in dataSet">
          <td class="border w-32 h-8 cursor-default" @contextmenu.prevent="onContextmenu" :key="td.id" v-for="td in row">{{td.value}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  data () {
    const dataSet = []
    for (let i = 0; i < 50; i++) {
      const tr = []
      for (let j = 0; j < 30; j++) {
        const td = {
          value: `${i}-${j}`,
          id: `${i}-${j}`
        }
        tr.push(td)
      }
      dataSet.push(tr)
    }
    return {
      dataSet
    }
  },
  methods: {
    onContextmenu () {
      console.log('contextmenu')
    }
  }

})
</script>

<style lang="scss" scoped>

</style>
