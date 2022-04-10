<template>
  <div>
    <div class="box">
      <div class="test-box test-inner-wrapper">
        <div class="wrapper left-wrapper" :class="{ 'selected-wrapper': isInTheBoxWrapList[0] }">
          <div class="inner-box" :class="{ 'selected-box': isInTheBoxList[i - 1], disabled: i === 2 }" v-for="i in 50" :id="`left_inner_box_${i}`" :key="`left_${i}`">{{ '' }}</div>
        </div>
        <div class="wrapper right-wrapper" :class="{ 'selected-wrapper': isInTheBoxWrapList[1] }"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MouseSelection from './lib/index'
// import { defineComponent, reactive, ref } from '@vue/composition-api'

interface CustomRect {
  left: number
  top: number
  width: number
  height: number
}

// export default defineComponent({
//   setup(props) {
//     reactive<{
//       wrapperMouseSelection: MouseSelection
//     }>({
//       wrapperMouseSelection: null,
//       documentSelection:null,
//       selectionPageRect:null,
//       isInTheBoxList:[],
//       isInTheBoxWrapList:[],
//       innerBoxRectList:CustomRect[]
//     })
//   }
// })

export default {
  data (): {
    wrapperMouseSelection: MouseSelection | undefined
    documentSelection: MouseSelection | undefined
    selectionPageRect: object | undefined
    isInTheBoxList: boolean[]
    isInTheBoxWrapList: boolean[]
    innerBoxRectList: CustomRect[]
    selectedSet: Set<unknown>
    } {
    let wrapperMouseSelection: MouseSelection | undefined

    let documentSelection: MouseSelection | undefined
    let selectionPageRect: object | undefined
    const isInTheBoxList: boolean[] = []
    const isInTheBoxWrapList: boolean[] = []
    const innerBoxRectList: CustomRect[] = []
    return {
      wrapperMouseSelection,

      documentSelection,
      selectionPageRect,
      isInTheBoxList,
      isInTheBoxWrapList,
      innerBoxRectList,

      selectedSet: new Set()
    }
  },
  methods: {
    doDestroy () {
      // @ts-ignore
      this.wrapperMouseSelection.destroy()
    }
  },
  mounted () {
    // @ts-ignore
    this.wrapperMouseSelection = new MouseSelection(document.querySelector('.left-wrapper'), {
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
.box {
  position: absolute;
  height: 'calc(100% - 50px)';
  //模拟浏览器滚动条的情况 : width设置Wie1500px;
  width: 100%;
  top: 50px;
  .test-box {
    .full-screen,
    .wrapper {
      width: 'calc(50% - 15px)';
      height: 'calc(100% - 20px)';
      position: absolute;
      top: 10px;
      background: rgba(255, 192, 203, 0.3);
      &.selected-wrapper {
        background: rgba(255, 192, 203, 0.5);
      }
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
      &.left-wrapper {
        left: 10px;
        overflow: scroll;
      }
      &.right-wrapper {
        right: 10px;
      }
    }
  }
}
.frame-selection-rectangle-element {
  border-style: dashed !important;
}
</style>
