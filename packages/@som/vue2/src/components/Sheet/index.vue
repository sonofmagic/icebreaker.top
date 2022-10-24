<template>


  <div ref="container" class="relative overflow-auto">
    <ContextMenu></ContextMenu>
    <!-- <thead class="sticky top-0 left-0 bg-white z-10">
        <tr>
          <th :key="i" v-for="(t,i) in titles" class="border h-[50px]">{{t}}</th>
        </tr>
      </thead> -->
    <!-- <VirtualList ref="table"
      class="w-auto table table-fixed border-collapse text-center bg-white h-[500px] overflow-y-auto" :data-key="'key'"
      :data-sources="dataSet" :data-component="SheetRow">
    </VirtualList> -->
    <table ref="table" class="w-auto table-fixed border-collapse text-center bg-white">

      <tbody>
        <tr :key="y" v-for="(row,y) in dataSet">
          <td class="border min-w-[120px] h-[48px] cursor-default select-none" @contextmenu.prevent="onContextmenu"
            @mousedown="onMousedown($event, {
              rowIndex: y, colIndex: x, item
            })" @mouseup="onMouseup($event, {
  rowIndex: y, colIndex: x, item
})" @mousemove="onMousemove" :key="item.id" v-for="(item, x) in row.cells">
            {{ item.value }}
          </td>
        </tr>

      </tbody>
    </table>

    <!-- <div class="absolute ring-2 ring-offset-0 ring-blue-600 pointer-events-none bg-gray-900 bg-opacity-10"
        :style="[selectionStyle]"></div> -->
    <Selection :style="[selectionStyle]"></Selection>
    <ContextMenu :context="menuContext">
      <div class="w-32 text-center">
        <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="closeContextMenu">
          复制
        </div>
        <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="closeContextMenu">
          粘贴
        </div>
        <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="closeContextMenu">
          锁定
        </div>
        <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="closeContextMenu">
          解锁
        </div>
        <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="closeContextMenu">
          行/列复制
        </div>
        <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="closeContextMenu">
          复制上一区间
        </div>
      </div>

    </ContextMenu>
    <!-- <div :style="{ 'visibility': tooltipVisible ? 'visible' : 'hidden' }" ref="tooltip"
      class="absolute border bg-white">
      <div class="hover:bg-gray-200 px-4 py-1 cursor-pointer" @click="closeModal">
        复制
      </div>
      <div class="hover:bg-gray-200 px-4 py-1 cursor-pointer" @click="closeModal">
        粘贴
      </div>

    </div> -->

  </div>


</template>

<script lang="ts" setup>
import { computed, defineComponent, ref, onMounted } from 'vue-demi'

// @ts-ignore
import ColumnResizer from 'column-resizer'
// @ts-ignore
import VirtualList from 'vue-virtual-scroll-list'
import { pick } from 'lodash-es'
import { onClickOutside, useWindowScroll, useScroll, unrefElement } from '@vueuse/core'
import useContainer from './hooks/useContainer'

import useKeyBoard from './hooks/useKeyBoard'
import { getDirection, getBoundingClientRect } from './utils'
import type { IDataSourceItem, IDataSourceRow, ICellAttrs } from './types'
import { throttle } from 'lodash-es'
import dayjs from 'dayjs'
// import DebugCell from './components/DebugCell.vue'

import ContextMenu, { useContextMenu } from './components/ContextMenu.tsx'
import Selection, { useSelection } from './components/Selection.tsx'

// import SheetRow from './components/SheetRow.vue'


const { x: windowX, y: windowY } = useWindowScroll()
const { shiftState } = useKeyBoard()
const container = ref<HTMLDivElement>()
const { left: containerLeft, top: containerTop, scrollX: containerScrollX, scrollY: containerScrollY } = useContainer(container)

const { resetSelectionPosition, selectionPosition, startCellAttrs, endCellAttrs, startEventTarget, assign: selectionAssign, reset: selectionReset, selectionStyle, startEventTargetRect } = useSelection({
  container: {
    left: containerLeft,
    scrollX: containerScrollX,
    scrollY: containerScrollY,
    top: containerTop
  },
  window: {
    scrollX: windowX,
    scrollY: windowY
  }
})

const dataSetSource: IDataSourceRow[] = []
const titles = ref<string[]>([])
const firstDay = dayjs().startOf('M')
for (let i = 0; i < 30; i++) {
  titles.value.push(firstDay.add(i, 'day').format('YYYY-MM-DD'))

}
for (let i = 0; i < 150; i++) {
  const tr = []
  for (let j = 0; j < 30; j++) {
    const td = {
      value: `${i}-${j}`,
      id: `${i}-${j}`,
      selected: false,
      readonly: false,
      disabled: false,

    }
    tr.push(td)
  }
  dataSetSource.push({
    cells: tr,
    key: 'row' + i,
  })
}
const dataSet = ref(dataSetSource)
const startSelection = ref(false)

const { context: menuContext } = useContextMenu()
const closeContextMenu = () => {
  menuContext.close()
}

function onContextmenu(e: MouseEvent) {
  menuContext.show({
    x: e.clientX,
    y: e.clientY
  })
}
function getSelectionValues(start: ICellAttrs, end: ICellAttrs) {
  const { colIndex: startcolIndex, rowIndex: startrowIndex } = start
  const { colIndex: endcolIndex, rowIndex: endrowIndex } = end
  const rows = [Math.min(startrowIndex, endrowIndex), Math.max(startrowIndex, endrowIndex) + 1]
  const cols = [Math.min(startcolIndex, endcolIndex), Math.max(startcolIndex, endcolIndex) + 1]
  const values = dataSet.value.slice(...rows).map(x => {
    return x.cells.slice(...cols)
  })
  return values.flat(1)

}



function setMoveStyle(rect: DOMRect) {
  // console.log(rect.left, selectionPosition.value.left)
  const centerRect = getBoundingClientRect(startEventTarget.value)
  // console.log(centerRect)
  const offsetX = rect.left - centerRect.left  //containerLeft.value - selectionPosition.value.left
  const offsetY = rect.top - centerRect.top // containerTop.value - selectionPosition.value.top

  if (offsetX > 0) {
    // 右
    selectionPosition.value.right = rect.right + containerScrollX.value + windowX.value //- containerLeft.value
    selectionPosition.value.width = Math.abs(offsetX) + rect.width

  } else if (offsetX < 0) {
    // 左
    selectionPosition.value.left = rect.left + containerScrollX.value - containerLeft.value
    selectionPosition.value.width = Math.abs(offsetX) + rect.width
  } else {
    selectionReset('x')

  }

  // console.log(rect.top, selectionPosition.value.top)
  if (offsetY > 0) {
    // 下
    selectionPosition.value.bottom = rect.bottom + containerScrollY.value + windowY.value //- containerTop.value
    selectionPosition.value.height = Math.abs(offsetY) + rect.height
  } else if (offsetY < 0) {
    // 上
    //  - containerTop.value
    // console.log(containerTop.value, windowY.value)
    selectionPosition.value.top = rect.top + containerScrollY.value - containerTop.value
    selectionPosition.value.height = Math.abs(offsetY) + rect.height

  } else {
    selectionReset('y')
  }
  console.log(offsetX, offsetY, getDirection([offsetX, offsetY]))



}
// https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/buttons
function onMousedown(e: MouseEvent, attrs: ICellAttrs) {
  if (e.buttons === 1) {
    startEventTarget.value = e.target
    const rect = getBoundingClientRect(startEventTarget.value)


    // 设置开始拖动

    startSelection.value = true
    console.log('onMousedown')
    // startEventTargetRect.value = rect
    // + windowY.value
    const computedRect = {
      left: rect.left + containerScrollX.value - containerLeft.value,
      right: rect.right + containerScrollX.value - containerLeft.value,
      top: rect.top + containerScrollY.value - containerTop.value,
      bottom: rect.bottom + containerScrollY.value - containerTop.value,
      width: rect.width,
      height: rect.height
    }
    // console.log(containerScrollY.value, windowY.value, containerTop.value, computedRect)
    // debugger
    selectionAssign(computedRect)
    endCellAttrs.value = attrs
    Object.assign(resetSelectionPosition.value, selectionPosition.value)
  }
}

function onMouseup(e: MouseEvent, attrs: ICellAttrs) {
  if (e.buttons === 0) {
    startSelection.value = false
    console.log('onMouseup')
    startCellAttrs.value = attrs
    if (endCellAttrs.value && startCellAttrs.value) {
      const values = getSelectionValues(endCellAttrs.value, startCellAttrs.value)
      console.log(values)
    }

  }
}


function _onMousemove(e: MouseEvent) {
  if (startSelection.value) {
    // console.log('onMousemove', e.target)
    const rect = (<HTMLElement>e.target).getBoundingClientRect()
    // console.log(rect, selectionPosition.value)
    setMoveStyle(rect)

  }
}

const onMousemove = throttle(_onMousemove, 20)



</script>

<style lang="scss" scoped>

</style>
