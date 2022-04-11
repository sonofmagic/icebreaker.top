<template>
  <div>
    <FrameSelection :data="mockData">
      <template v-slot="{ item, selected }">
        <div
          class="inner-box"
          :class="{
            selected: selected
          }"
        >
          {{ item.id }}
        </div>
      </template>
    </FrameSelection>
    <div class="grid grid-cols-6">
      <Calendar v-model="calendarArray[i - 1]" class="mb-4" :key="i" :year="currentYear" :month="i" v-for="i in 12"></Calendar>
    </div>
  </div>
</template>

<script lang="ts">
import Calendar from './Calendar/index.vue'
import FrameSelection from './FrameSelection/index.vue'
interface CustomRect {
  left: number
  top: number
  width: number
  height: number
}

const mockData = new Array(100).fill(0).map((x, idx) => {
  return {
    id: idx,
    disabled: false // Boolean(idx % 2)
  }
})

export default {
  components: {
    Calendar,
    FrameSelection
  },
  data (): {
    currentYear: number
    calendarArray: string[][]

    mockData: typeof mockData
    } {
    return {
      currentYear: 2022,
      calendarArray: new Array(12).fill([]),
      // documentSelection,

      mockData
    }
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
