<script>
import dayjs from 'dayjs'
import Vue from 'vue'

const xAxisArr = ['日', '一', '二', '三', '四', '五', '六']

export default Vue.extend({
  props: {
    // now: {
    //   type: [Object],
    //   default: () => dayjs()
    // },
    month: {
      type: [Number],
      default: 1,
    },
    year: {
      type: [Number],
      default: 2022,
    },
    value: {
      type: [Set],
      default: () => new Set(),
    },
    // genId
  },
  data() {
    const items = []
    return {
      xAxisArr,
      items,
    }
  },
  computed: {
    _dates() {
      const workday = []
      const saturday = []
      const sunday = []
      let p
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i]
        const idx = i % 7
        if (idx === 0) {
          p = sunday
        }
        else if (idx === 6) {
          p = saturday
        }
        else {
          p = workday
        }
        if (!item.disabled) {
          p.push(item)
        }
      }
      return {
        workday,
        saturday,
        sunday,
      }
    },
    workday() {
      return this._dates.workday
    },
    saturday() {
      return this._dates.saturday
    },
    sunday() {
      return this._dates.sunday
    },
  },
  watch: {
    month() {
      this.sync()
    },
    year() {
      this.sync()
    },
  },
  created() {
    this.sync()
  },
  methods: {
    valueFormat(year, month, date) {
      return [year, month + 1, date].join('-')
    },
    onClick(item) {
      if (!item.disabled) {
        if (item.selected) {
          this.value.delete(item.value)
        }
        else {
          this.value.add(item.value)
        }

        item.selected = !item.selected
      }
    },
    createDateItem(item) {
      return Object.assign(
        {},
        {
          disabled: true,
          selected: false,
          color: null,
        },
        item,
      )
    },
    getItems() {
      const { year, month } = this
      // Months are zero indexed, so January is month 0.
      const now = dayjs()
        .year(year)
        .month(month - 1)
      const daysInMonth = now.daysInMonth()
      const start = now.startOf('month')
      const prevMonth = now.add(-1, 'month')
      const nextMonth = now.add(1, 'month')
      const prevMonthEnd = prevMonth.endOf('month')
      const prevMonthEndDate = prevMonthEnd.date()
      const startIdx = start.day()
      const arr = Array.from({ length: 6 * 7 }).fill(0).map((_x, idx) => {
        const offset = idx - startIdx
        // 上个月
        if (offset < 0) {
          const text = prevMonthEndDate + offset + 1

          return this.createDateItem({
            text,
            value: this.valueFormat(prevMonth.year(), prevMonth.month(), text),
          })
        }
        else if (offset >= daysInMonth) {
          // 下个月
          const text = offset - daysInMonth + 1
          const value = this.valueFormat(
            nextMonth.year(),
            nextMonth.month(),
            text,
          )
          return this.createDateItem({
            text,
            value,
          })
        }
        const text = offset + 1
        const value = this.valueFormat(now.year(), now.month(), text)
        const disabled = false
        return this.createDateItem({
          text,
          disabled,
          value,
          selected: this.value.has(value) && !disabled,
        })
      })
      return arr
    },
    sync() {
      this.items = this.getItems()
      this.$emit('init', this.items)
    },
  },
})
</script>

<template>
  <div class="som-calendar-wrap">
    <div class="month-label">
      {{ month }}月
    </div>
    <div class="main-content">
      <div class="date-row axis">
        <div v-for="x in xAxisArr" :key="x" class="row-item">
          {{ x }}
        </div>
      </div>
      <div class="date-row">
        <template v-for="(item, idx) in items">
          <slot :item="item" :index="idx">
            <div
              :key="item.value"
              class="row-item"
              :class="[
                {
                  disabled: item.disabled,
                  selected: item.selected,
                },
              ]"
              @click="onClick(item)"
            >
              {{ item.text }}
            </div>
          </slot>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.som-calendar-wrap {
  @apply w-[236px];
  .month-label {
    @apply select-none text-lg font-medium text-[#3380FF];
  }
  .main-content {
    @apply h-[188px];
    .date-row {
      @apply grid h-[161px] grid-cols-7;
      &.axis {
        @apply h-[26.8px];
        .row-item {
          @apply cursor-auto text-[#333333];
        }
      }
      .row-item {
        @apply flex h-5 w-5 cursor-pointer select-none items-center justify-center text-[13px] font-medium leading-[20px] text-[#666666] transition-colors;

        &.disabled {
          @apply cursor-not-allowed text-[#C0C4CC];
        }
        &.selected {
          @apply bg-[#3380ff] text-white #{!important};
        }
      }
    }
  }
}
</style>
