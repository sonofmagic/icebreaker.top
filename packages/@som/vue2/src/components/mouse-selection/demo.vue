<template>
  <div>
    <SelectionDemo></SelectionDemo>
    <!-- <div ref="wrapper" class="wrapper">
      <div class="inner-box" :class="{ selected: !item.disabled && (isInTheBoxList[idx] || checkSelected(idx)) }" v-for="(item, idx) in mockData" :key="item.id">{{ item.id }}</div>
    </div>
    <div>
      <span :key="x" v-for="x in selectedSet">{{ x }} </span>
    </div> -->
    <div class="grid grid-cols-6">
      <Calendar v-model="calendarArray[i-1]" class="mb-4" :key="i" :year="currentYear" :month="i" v-for="i in 12"></Calendar>
    </div>
  </div>
</template>

<script lang="ts">
import MouseSelection from './lib/index'
import Calendar from './Calendar/index.vue'
import SelectionDemo from './SelectionDemo.vue'
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
    SelectionDemo
  },
  data (): {
    currentYear: number
    calendarArray: string[][]
    wrapperMouseSelection: MouseSelection | undefined
    // documentSelection: MouseSelection | undefined

    isInTheBoxList: boolean[]

    innerBoxRectList: CustomRect[]
    selectedSet: Set<unknown>
    mockData: typeof mockData
    } {
    let wrapperMouseSelection: MouseSelection | undefined

    // let documentSelection: MouseSelection | undefined

    const isInTheBoxList: boolean[] = []

    const innerBoxRectList: CustomRect[] = []
    return {
      currentYear: 2022,
      wrapperMouseSelection,
      calendarArray: new Array(12).fill([]),
      // documentSelection,

      isInTheBoxList,

      innerBoxRectList,

      selectedSet: new Set(),

      mockData
    }
  },
  methods: {
    doDestroy () {
      // @ts-ignore
      this.wrapperMouseSelection.destroy()
    },
    checkSelected (id: number): boolean {
      // @ts-ignore
      return this.selectedSet.has(id)
    }
  },
  mounted () {
    // let isClick = false

    // const inBoxSync = () => {
    //   // @ts-ignore
    //   this.isInTheBoxList = this.innerBoxRectList.map((rect) => {
    //     // @ts-ignore
    //     return this.wrapperMouseSelection.isInTheSelection(rect)
    //   })
    // }

    // // @ts-ignore
    // this.wrapperMouseSelection = new MouseSelection(this.$refs.wrapper, {
    //   onMousedown: () => {
    //     isClick = true
    //     // @ts-ignore
    //     this.innerBoxRectList = (Array.from(this.$refs.wrapper.querySelectorAll('.inner-box')) as HTMLElement[]).map((node: HTMLElement) => {
    //       return {
    //         left: node.offsetLeft,
    //         top: node.offsetTop,
    //         width: node.offsetWidth,
    //         height: node.offsetHeight
    //       }
    //     })
    //   },
    //   onMousemove: () => {
    //     isClick = false
    //     inBoxSync()
    //   },
    //   onMouseup: () => {
    //     if (isClick) {
    //       inBoxSync()
    //     }
    //     // @ts-ignore
    //     this.isInTheBoxList
    //       // @ts-ignore
    //       .reduce<number[]>((acc, cur, idx) => {
    //         if (cur) {
    //           acc.push(idx)
    //         }
    //         return acc
    //       }, [])
    //       .forEach((x: number) => {
    //         // @ts-ignore
    //         if (!this.mockData[x].disabled) {
    //           // @ts-ignore
    //           this.selectedSet.add(x)
    //         }
    //       })

    //     // @ts-ignore
    //     this.isInTheBoxList = []
    //     isClick = false
    //   },
    //   // disabled: () => {
    //   //   return false
    //   // },
    //   // stopSelector: 'div.disabled',
    //   stopPropagation: true
    // })
  }
}
</script>

<style lang="scss">
.wrapper {
  background: rgba(255, 192, 203, 0.3);
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
}

// .frame-selection-rectangle-element {
//   border-style: dashed !important;
// }
</style>
