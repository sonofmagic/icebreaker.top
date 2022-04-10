<template>
  <div>
    <div ref="wrapper" class="wrapper">
      <div class="inner-box" :class="{ 'selected-box': isInTheBoxList[i - 1] || checkSelected(i - 1), disabled: i === 2 }" v-for="i in 50" :id="`left_inner_box_${i}`" :key="`left_${i}`">{{ '' }}</div>
    </div>

    <div>
      <span :key="n" v-for="n in selectedSet">{{ n }},</span>
    </div>
  </div>
</template>

<script lang="ts">
import MouseSelection from './lib/index'

interface CustomRect {
  left: number
  top: number
  width: number
  height: number
}

export default {
  data (): {
    wrapperMouseSelection: MouseSelection | undefined
    documentSelection: MouseSelection | undefined
    selectionPageRect: object | undefined
    isInTheBoxList: boolean[]

    innerBoxRectList: CustomRect[]
    selectedSet: Set<unknown>
    } {
    let wrapperMouseSelection: MouseSelection | undefined

    let documentSelection: MouseSelection | undefined
    let selectionPageRect: object | undefined
    const isInTheBoxList: boolean[] = []

    const innerBoxRectList: CustomRect[] = []
    return {
      wrapperMouseSelection,

      documentSelection,
      selectionPageRect,
      isInTheBoxList,

      innerBoxRectList,

      selectedSet: new Set()
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
    // @ts-ignore
    this.wrapperMouseSelection = new MouseSelection(this.$refs.wrapper, {
      onMousedown: () => {
        // @ts-ignore
        this.innerBoxRectList = (Array.from(document.querySelectorAll('.inner-box')) as HTMLElement[]).map((node: HTMLElement) => {
          return {
            left: node.offsetLeft,
            top: node.offsetTop,
            width: node.offsetWidth,
            height: node.offsetHeight
          }
        })
      },
      onMousemove: () => {
        // @ts-ignore
        this.isInTheBoxList = this.innerBoxRectList.map((rect) => {
          // @ts-ignore
          return this.wrapperMouseSelection.isInTheSelection(rect)
        })
      },
      onMouseup: () => {
        // @ts-ignore
        this.isInTheBoxList
          // @ts-ignore
          .reduce<number[]>((acc, cur, idx) => {
            if (cur) {
              acc.push(idx)
            }
            return acc
          }, [])
          .forEach((x: number) => {
            // @ts-ignore
            this.selectedSet.add(x)
          })
        // @ts-ignore
        this.isInTheBoxList = []
      },
      disabled: () => {
        return false
      },
      stopSelector: 'div.disabled',
      stopPropagation: true
    })
  }
}
</script>

<style lang="scss">
.wrapper {
  width: 'calc(50% - 15px)';
  height: 'calc(100% - 20px)';

  overflow: scroll;
  background: rgba(255, 192, 203, 0.3);
  .inner-box {
    width: 100px;
    height: 100px;
    background: rgba(255, 192, 203, 0.3);
    display: inline-block;
    margin-left: 20px;
    margin-top: 20px;
    vertical-align: top;
    user-select: none;
    &.selected-box {
      background: rgba(255, 192, 203, 1);
    }
  }
}

.frame-selection-rectangle-element {
  border-style: dashed !important;
}
</style>
