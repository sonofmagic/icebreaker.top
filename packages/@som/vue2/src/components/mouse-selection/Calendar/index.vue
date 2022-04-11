<template>
  <div class="w-[236px]">
    <div class="text-lg text-[#3380FF] font-medium">{{ month }}月</div>
    <div class="h-[188px]">
      <div class="grid grid-cols-7 h-[26.8px]">
        <div class="text-[13px] text-[#333333] font-medium flex justify-center items-center" :key="x" v-for="x in xAxisArr">{{ x }}</div>
      </div>
      <div class="grid grid-cols-7 h-[161px]">
        <div
          class="text-[13px] text-[#666666] flex justify-center items-center"
          :class="{
            'text-[#C0C4CC]': item.disabled,
            'cursor-not-allowed': item.disabled
          }"
          :key="item.value"
          v-for="item in items"
        >
          {{ item.text }}
        </div>
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
      const prevMonth = now.add(-1, 'month')
      const prevMonthEnd = prevMonth.endOf('month')
      const prevMonthEndDate = prevMonthEnd.date()
      const startIdx = start.day()
      const arr = new Array(6 * 7).fill(0).map((x, idx) => {
        const offset = idx - startIdx
        // 上个月
        if (offset < 0) {
          const text = prevMonthEndDate + offset + 1
          return {
            text,
            disabled: true,
            value: [this.year, this.month, text].join('.')
          }
        } else if (offset >= daysInMonth) {
          // 下个月
          const text = offset - daysInMonth + 1
          return {
            text,
            disabled: true,
            value: [this.year, this.month, text].join('.')
          }
        }
        return {
          text: offset + 1,
          disabled: false
        }
      })
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
