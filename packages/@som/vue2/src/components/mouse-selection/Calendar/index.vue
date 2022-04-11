<template>
  <div class="som-calendar-wrap">
    <div class="month-label">{{ month }}月</div>
    <div class="main-content">
      <div class="date-row axis">
        <div class="row-item" :key="x" v-for="x in xAxisArr">{{ x }}</div>
      </div>
      <div class="date-row">
        <template v-for="(item, idx) in items">
          <slot :item="item" :index="idx">
            <div
              class="row-item"
              :class="[
                {
                  disabled: item.disabled,
                  selected: item.selected
                }
              ]"
              :key="item.id"
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

<script>
import dayjs from 'dayjs'
// import { v4 } from 'uuid'
import { nanoid } from 'nanoid'
// dayjs().get
const xAxisArr = ['日', '一', '二', '三', '四', '五', '六']
export default {
  data () {
    return {
      xAxisArr,
      items: []
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
    },
    value: {
      type: [Array],
      default: () => []
    }
  },
  watch: {
    month () {
      this.sync()
    },
    year () {
      this.sync()
    }
  },
  methods: {
    emitInput () {
      this.$emit(
        'input',
        this.items.filter((x) => x.selected).map((x) => x.value)
      )
    },
    valueFormat (text) {
      return [this.year, this.month, text].join('-')
    },
    onClick (item) {
      if (!item.disabled) {
        item.selected = !item.selected
        this.emitInput()
      }
    },
    getItems () {
      const { year, month } = this
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
            id: nanoid(),
            text,
            disabled: true,
            value: this.valueFormat(text),
            selected: false,
            color: null
          }
        } else if (offset >= daysInMonth) {
          // 下个月
          const text = offset - daysInMonth + 1
          return {
            id: nanoid(),
            text,
            disabled: true,
            value: this.valueFormat(text),
            selected: false,
            color: null
          }
        }
        const text = offset + 1
        const value = this.valueFormat(text)
        const disabled = false
        return {
          id: nanoid(),
          text,
          disabled,
          value,
          selected: this.value.includes(value) && !disabled,
          color: null
        }
      })
      return arr
    },
    sync () {
      this.items = this.getItems()
      this.$emit('init', this.items)
    }
  },
  created () {
    this.sync()
  }
}
</script>

<style lang="scss" scoped>
.som-calendar-wrap {
  @apply w-[236px];
  .month-label {
    @apply text-lg text-[#3380FF] font-medium select-none;
  }
  .main-content {
    @apply h-[188px];
    .date-row {
      @apply grid grid-cols-7 h-[161px];
      &.axis {
        @apply h-[26.8px];
        .row-item {
          @apply text-[#333333] cursor-auto;
        }
      }
      .row-item {
        @apply text-[#666666] text-[13px] leading-[20px] cursor-pointer font-medium flex justify-center items-center w-5 h-5 transition-colors ;
        user-select: none;
        &.disabled {
          @apply text-[#C0C4CC] cursor-not-allowed;
        }
        &.selected {
          @apply text-white bg-[#3380ff] #{!important};
        }
      }
    }
  }
}
</style>
