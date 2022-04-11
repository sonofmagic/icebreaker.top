<template>
  <div class="w-[220px]">
    <div class="text-lg text-[#3380FF] font-medium">{{ month }}月</div>
    <div class="grid grid-cols-7">
      <div class="text-center text-[13px] text-[#333333]" :key="x" v-for="x in xAxisArr">{{ x }}</div>
    </div>
    <div class="grid grid-cols-7">
      <div
        class="text-center text-[13px] text-[#666666]"
        :class="{
          'text-[#C0C4CC]': false
        }"
        :key="idx"
        v-for="(item, idx) in items"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
// dayjs().get
const xAxisArr = ['日', '一', '二', '三', '四', '五', '六']
export default {
  data () {
    return {
      xAxisArr
    }
  },
  props: {
    // now: {
    //   type: [Object],
    //   default: () => dayjs()
    // },
    month: {
      type: [Number],
      default: 1
    },
    year: {
      type: [Number],
      default: 2022
    }
  },
  computed: {
    items ({ year, month }) {
      // Months are zero indexed, so January is month 0.
      const now = dayjs()
        .year(year)
        .month(month - 1)
      const daysInMonth = now.daysInMonth()
      const start = now.startOf('month')
      // const end = now.endOf('month')
      const startIdx = start.day()
      const arr = new Array(6 * 7).fill(0).map((x, idx) => {
        const offset = idx - startIdx
        if (offset < 0) {
          return 0
        }
        if (offset >= daysInMonth) {
          return 0
        }
        return offset + 1
      })
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
