<template>
  <div class="p-4">
    <div>
      <el-form>
        <el-form-item label="年份选择">
          <el-date-picker @change="onYearChange" size="small" value-format="yyyy" v-model="currentYear" type="year" placeholder="选择年"> </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="space-x-3 mb-4">
      <button
        :style="[
          {
            color: b.color,
            border: '1px solid ' + b.color
          }
        ]"
        :key="b.color"
        v-for="b in buttonList"
        type="primary"
        @click="onChangeColor(b)"
      >
        {{ b.text }}
      </button>
    </div>
    <FrameSelectionGroup ref="selection" @mousedown="onMousedown" @mousemove="onMousemove" @mouseup="onMouseup">
      <div class="grid grid-cols-6">
        <Calendar class="mb-4" :key="i" :year="parseInt(currentYear)" :month="i" v-for="i in 12" @init="onCalendarInit($event, i - 1)">
          <template v-slot="{ item, index }">
            <FrameSelectionItem
              :class="[
                {
                  disabled: item.disabled,
                  selected: isSelected(item, index, i)
                }
              ]"
              class="w-full h-full flex items-center justify-center row-item"
              :style="[
                {
                  color: item.color
                }
              ]"
            >
              {{ item.text }}
            </FrameSelectionItem>
          </template>
        </Calendar>
      </div>
    </FrameSelectionGroup>
  </div>
</template>

<script>
import Calendar from './Calendar/index.vue'
// import FrameSelection from './FrameSelection/index.vue'
import FrameSelectionGroup from './FrameSelection/group.vue'
import FrameSelectionItem from './FrameSelection/item.vue'
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
    FrameSelectionItem
  },
  data () {
    const calendarItemCount = 42
    return {
      currentYear: '2022',
      calendarItemCount,
      calendarArray: new Array(12).fill([]),
      isInTheBoxList: [],
      innerBoxRectList: [],
      selectedSet: new Set(),
      buttonList: [
        {
          text: '工作日',
          color: '#3380FF'
        },
        {
          text: '自定义',
          color: '#008A3B'
        },
        {
          text: '假日',
          color: '#FF7C37'
        },
        {
          text: '节日',
          color: '#FF3333'
        }
      ]
    }
  },
  props: {
    data: {
      type: [Array],
      default: () => []
    },
    valueKey: {
      type: [String],
      default: 'id'
    }
  },
  computed: {
    totalCalendarArray ({ calendarArray }) {
      return calendarArray.reduce((acc, cur) => {
        acc = acc.concat(cur)
        return acc
      }, [])
    }
  },
  methods: {
    onYearChange () {
      this.clear()
    },
    onChangeColor (b) {
      this.selectedSet.forEach((x) => {
        this.totalCalendarArray[x].color = b.color
      })
      this.clear()
      // b.color
    },
    clear () {
      this.selectedSet.clear()
    },
    isSelected (item, index, pidx) {
      const notDisabled = !item.disabled
      const idx = (pidx - 1) * this.calendarItemCount + index
      return notDisabled && (this.isInTheBoxList[idx] || this.checkSelected(idx))
    },
    checkSelected (idx) {
      return this.selectedSet.has(idx)
    },
    onMousedown () {
      this.isClick = true
      this.innerBoxRectList = this.$refs.selection.getInnerBoxRectList()
    },

    onMousemove () {
      this.isClick = false
      this.inBoxSync()
    },
    onMouseup () {
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
    inBoxSync () {
      this.isInTheBoxList = this.innerBoxRectList.map((rect) => {
        return this.$refs.selection.isInTheSelection(rect)
      })
    },
    onCalendarInit (data, idx) {
      // console.log(data, idx)
      this.calendarArray[idx] = data
      // 42
    }
  },
  created () {
    this.isClick = false
  }
}
</script>

<style lang="scss">
.inner-box {
  width: 40px;
  height: 40px;
  background: rgba(255, 192, 203, 0.3);
  display: inline-block;
  margin-left: 20px;
  margin-top: 20px;
  vertical-align: top;
  user-select: none;
  &.selected {
    background: rgba(255, 192, 203, 1);
  }
}

// .frame-selection-rectangle-element {
//   border-style: dashed !important;
// }
</style>
