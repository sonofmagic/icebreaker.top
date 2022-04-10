<template>
  <div>
    <div ref="wrapper" class="wrapper">
      <div ref="boxs" class="inner-box" :class="{ 'selected-box': isInTheBoxList[i - 1] || checkSelected(i - 1) }" v-for="i in 50" :key="i">{{ i }}</div>
    </div>

    <div>
      <span :key="idx" v-for="(n, idx) in selectedSet">{{ n }},</span>
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

    isInTheBoxList: boolean[]

    innerBoxRectList: CustomRect[]
    selectedSet: Set<unknown>
    } {
    let wrapperMouseSelection: MouseSelection | undefined

    let documentSelection: MouseSelection | undefined

    const isInTheBoxList: boolean[] = []

    const innerBoxRectList: CustomRect[] = []
    return {
      wrapperMouseSelection,

      documentSelection,

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
    let isClick = false

    const inBoxSync = () => {
      // @ts-ignore
      this.isInTheBoxList = this.innerBoxRectList.map((rect) => {
        // @ts-ignore
        return this.wrapperMouseSelection.isInTheSelection(rect)
      })
    }
    // @ts-ignore
    this.wrapperMouseSelection = new MouseSelection(this.$refs.wrapper, {
      onMousedown: () => {
        isClick = true
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
        isClick = false
        inBoxSync()
      },
      onMouseup: () => {
        if (isClick) {
          inBoxSync()
        }
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
        isClick = false
      },
      disabled: () => {
        return false
      },
      stopSelector: 'div.disabled'
      // stopPropagation: true
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
