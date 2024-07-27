<template>
  <div class="p-4">
    <div>
      <el-form size="small" inline>
        <el-form-item label="年份选择">
          <el-date-picker
            v-model="currentYear"
            :clearable="false"
            value-format="yyyy"
            type="year"
            placeholder="选择年"
            @change="onYearChange"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="设工作日为">
          <el-select
            v-model="workday"
            value-key="color"
            @change="onWorkdayChange"
          >
            <el-option
              v-for="b in buttonList"
              :key="b.color"
              :value="b"
              :label="b.text"
              >{{ b.text }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="设周六为">
          <el-select
            v-model="saturday"
            value-key="color"
            @change="onSaturdayChange"
          >
            <el-option
              v-for="b in buttonList"
              :key="b.color"
              :value="b"
              :label="b.text"
              >{{ b.text }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="设周日为">
          <el-select
            v-model="sunday"
            value-key="color"
            @change="onSundayChange"
          >
            <el-option
              v-for="b in buttonList"
              :key="b.color"
              :value="b"
              :label="b.text"
              >{{ b.text }}</el-option
            >
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="mb-4 space-x-3">
      <button
        v-for="b in buttonList"
        :key="b.color"
        :style="[
          {
            color: b.color,
            border: '1px solid ' + b.color,
          },
        ]"
        type="primary"
        @click="onChangeColor(b)"
      >
        {{ b.text }}
      </button>
    </div>
    <!-- @touchstart="onTouchstart"
      @touchmove="onTouchmove"
      @touchend="onTouchend" -->
    <FrameSelectionGroup
      ref="selection"
      @mousedown="onMousedown"
      @mousemove="onMousemove"
      @mouseup="onMouseup"
    >
      <div class="date-selection-area">
        <Calendar
          v-for="i in 12"
          ref="calendar"
          :key="i"
          class="mb-4"
          :year="parseInt(currentYear)"
          :month="i"
          @init="onCalendarInit($event, i - 1)"
        >
          <template #default="{ item, index }">
            <FrameSelectionItem
              :class="[
                {
                  disabled: item.disabled,
                  selected: isSelected(item, index, i),
                },
              ]"
              class="row-item flex h-full w-full items-center justify-center"
              :style="[
                {
                  color: item.color,
                },
              ]"
            >
              {{ item.text }}
            </FrameSelectionItem>
          </template>
        </Calendar>
      </div>
    </FrameSelectionGroup>

    <!-- <Calendar :year="1995" :month="9" :value="set"></Calendar> -->
  </div>
</template>

<script>
import {
  FrameSelectionGroup,
  FrameSelectionItem,
  // MouseSelection
} from 'vue-frame-selection'
import Calendar from './Calendar.vue'
// import FrameSelection from './FrameSelection/index.vue'
// import FrameSelectionGroup from '../src/group.vue'
// import FrameSelectionItem from '../src/item.vue'
// interface CustomRect {
//   left: number
//   top: number
//   width: number
//   height: number
// }

export default {
  components: {
    Calendar,
    // FrameSelection,
    FrameSelectionGroup,
    FrameSelectionItem,
  },
  props: {
    data: {
      type: [Array],
      default: () => [],
    },
    valueKey: {
      type: [String],
      default: 'id',
    },
  },
  data() {
    const calendarItemCount = 42
    return {
      set: new Set(),
      workday: null,
      saturday: null,
      sunday: null,
      currentYear: '2022',
      calendarItemCount,
      calendarArray: new Array(12).fill([]),
      isInTheBoxList: [],
      innerBoxRectList: [],
      selectedSet: new Set(),
      buttonList: [
        {
          text: '工作日',
          color: '#3380FF',
        },
        {
          text: '自定义',
          color: '#008A3B',
        },
        {
          text: '假日',
          color: '#FF7C37',
        },
        {
          text: '节日',
          color: '#FF3333',
        },
      ],
    }
  },
  computed: {
    totalCalendarArray({ calendarArray }) {
      return calendarArray.reduce((acc, cur) => {
        acc = acc.concat(cur)
        return acc
      }, [])
    },
  },
  created() {
    this.isClick = false
  },
  methods: {
    onWorkdayChange(item) {
      this.$refs.calendar.forEach((calendar) => {
        calendar.workday.forEach((x) => {
          x.color = item.color
        })
      })
    },
    onSaturdayChange(item) {
      this.$refs.calendar.forEach((calendar) => {
        calendar.saturday.forEach((x) => {
          x.color = item.color
        })
      })
    },
    onSundayChange(item) {
      this.$refs.calendar.forEach((calendar) => {
        calendar.sunday.forEach((x) => {
          x.color = item.color
        })
      })
    },
    onYearChange() {
      this.clear()
    },
    onChangeColor(b) {
      this.selectedSet.forEach((x) => {
        this.totalCalendarArray[x].color = b.color
      })
      this.clear()
      // b.color
    },
    clear() {
      this.selectedSet.clear()
    },
    isSelected(item, index, pidx) {
      const notDisabled = !item.disabled
      const idx = (pidx - 1) * this.calendarItemCount + index
      return (
        notDisabled && (this.isInTheBoxList[idx] || this.checkSelected(idx))
      )
    },
    checkSelected(idx) {
      return this.selectedSet.has(idx)
    },
    onMousedown() {
      this.isClick = true
      this.innerBoxRectList = this.$refs.selection.getInnerBoxRectList()
    },

    onMousemove() {
      this.isClick = false
      this.inBoxSync()
    },
    onMouseup() {
      if (this.isClick) {
        this.inBoxSync()
      }

      this.isInTheBoxList
        .reduce((acc, cur, idx) => {
          if (cur) {
            acc.push(idx)
          }
          return acc
        }, [])
        .forEach((x) => {
          if (!this.totalCalendarArray[x].disabled) {
            if (this.isClick) {
              // toggle
              if (this.selectedSet.has(x)) {
                this.selectedSet.delete(x)
              } else {
                this.selectedSet.add(x)
              }
            } else {
              this.selectedSet.add(x)
            }
          }
        })

      this.isInTheBoxList = []
      this.isClick = false
    },
    inBoxSync() {
      this.isInTheBoxList = this.innerBoxRectList.map((rect) => {
        return this.$refs.selection.isInTheSelection(rect)
      })
    },
    onCalendarInit(data, idx) {
      this.$set(this.calendarArray, idx, data)
    },
  },
}
</script>

<style lang="scss">
@mixin responsive-grid-items($container-width, $card-width, $col-num) {
  @apply grid grid-cols-1;
  @if $col-num > 1 {
    @for $i from 2 through $col-num {
      // @debug $container-width - $card-width * ($col-num - $i);
      @media screen and (min-width: $container-width - $card-width * ($col-num - $i)) {
        @apply grid-cols-#{$i};
      }
    }
  }
}

.date-selection-area {
  @include responsive-grid-items(1920px, 236px, 6);
}
// .frame-selection-rectangle-element {
//   border-style: dashed !important;
// }
</style>
