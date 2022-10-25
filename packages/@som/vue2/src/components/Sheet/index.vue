
<template>


  <div ref="container" class="relative overflow-y-auto">

    <!-- <thead class="sticky top-0 left-0 bg-white z-10">
        <tr>
          <th :key="i" v-for="(t,i) in titles" class="border h-[50px]">{{t}}</th>
        </tr>
      </thead> -->
    <!-- <VirtualList ref="table"
      class="w-auto table table-fixed border-collapse text-center bg-white h-[500px] overflow-y-auto" :data-key="'key'"
      :data-sources="dataSet" :data-component="SheetRow">
    </VirtualList> -->
    <!-- <table ></table> -->
    <div>
      <table ref="table" class="w-auto table-fixed border-collapse text-center bg-white">
        <colgroup>
          <col :key="col.key" :style="{
            'min-width': col.width + 'px'
          }" v-for="col in cols">
          </col>
        </colgroup>
        <tbody>
          <tr :key="y" v-for="(row, y) in dataSet">
            <td data-sheet-cell="1" class="border h-[48px] cursor-default select-none" :key="item.id"
              @contextmenu.prevent="onContextmenu" @mousedown="onMousedown($event, {
                rowIndex: y, colIndex: x, item
              })" @mouseup="onMouseup($event, {
  rowIndex: y, colIndex: x, item
})" @mousemove="onMousemove" v-for="(item, x) in row.cells" @dblclick="onDblclick($event, {
  rowIndex: y, colIndex: x, item
})" @mouseleave="onMouseleave($event, {
  rowIndex: y, colIndex: x, item
})" @mouseenter="onMouseenter($event, {
  rowIndex: y, colIndex: x, item
})">


              <div v-if="item.value" :class="{
                'cursor-pointer': Boolean(item.value),
                'has-note': Boolean(item.note)
              }"
                class="sheet-cell-inner select-none pointer-events-auto relative w-full h-full flex justify-between border-l-[2px] border-blue-600">

                <div class="text-left flex flex-col justify-evenly pl-1.5">
                  <div class="text-[13px] text-[#333333]">加科技看看{{ item.value }}</div>
                  <div class="text-xs text-[#B1B9CC]">15:30-18:00</div>
                </div>
                <div class="text-xs flex items-center pr-1.5">{{ item.locked ? '锁' : '' }}</div>


              </div>

            </td>
          </tr>

        </tbody>
      </table>
    </div>

    <Selection :context="selectionContext" :style-object="selectionStyle"></Selection>
    <ContextMenu :context="menuContext">
      <div class="w-32 text-center">
        <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="closeContextMenu">
          复制
        </div>
        <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="closeContextMenu">
          粘贴
        </div>
        <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="doLock">
          锁定
        </div>
        <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="unlock">
          解锁
        </div>
        <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="doNote">
          备注
        </div>
        <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="closeContextMenu">
          行/列复制
        </div>
        <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="closeContextMenu">
          复制上一区间
        </div>
      </div>

    </ContextMenu>
    <Popover :context="valueSelectorContext" placement="bottom-start">
      <div class="bg-white w-[360px]  p-2 border ">
        <div>未定义</div>
        <input class="border" placeholder="请输入" />
        <div class="overflow-auto h-[200px]">
          <div :key="i" v-for="i in 30" @click="selectValue($event, i)"
            class="flex justify-around cursor-pointer hover:bg-blue-300">
            <div class="flex-1">撒大声地</div>
            <div class="flex-1">{{ i }}</div>
          </div>
        </div>
      </div>
    </Popover>
    <Popover :context="showDetailContext" :placement="'bottom-start'">
      <div class="bg-white w-[160px] text-xs border px-2 py-1 space-y-1">
        <div class="text-[13px] text-[#333333]">{{ detailCellAttrs?.item.value }}的值啊啊</div>
        <div class="text-[#333333]">11:11-33:22 24.00h</div>
        <div class="text-[#B1B9CC]" v-if="detailCellAttrs?.item.note">备注:{{ detailCellAttrs?.item.note }}</div>
      </div>
    </Popover>

  </div>


</template>

<script lang="ts" setup>
import { MessageBox } from 'element-ui'
import { computed, defineComponent, ref, onMounted, nextTick, reactive } from 'vue-demi'

// @ts-ignore
import ColumnResizer from 'column-resizer'
// @ts-ignore
import VirtualList from 'vue-virtual-scroll-list'
import { pick, throttle } from 'lodash-es'
import { onClickOutside, useWindowScroll, useScroll, unrefElement } from '@vueuse/core'
import useContainer from './hooks/useContainer'

import useKeyBoard from './hooks/useKeyBoard'
import { getDirection, getBoundingClientRect } from './utils'
import type { IDataSourceItem, IDataSourceRow, ICellAttrs } from './types'
import dayjs from 'dayjs'


import { useContextMenu, ContextMenu } from './components/ContextMenu'
import { useSelection, Selection } from './components/Selection'
// import { ValueSelector, useValueSelector } from './components/ValueSelector'
import { Popover, usePopover } from './components/Popover'
// import { OnClickOutside } from '@vueuse/components'
// import SheetRow from './components/SheetRow.vue'

const { context: valueSelectorContext } = usePopover()
const { context: showDetailContext } = usePopover()
const { x: windowX, y: windowY } = useWindowScroll()
const { shiftState } = useKeyBoard()
const container = ref<HTMLDivElement>()
const selectionValues = ref<IDataSourceItem[]>()
const { left: containerLeft, top: containerTop, scrollX: containerScrollX, scrollY: containerScrollY } = useContainer(container)

const { resetSelectionPosition, selectionPosition, startCellAttrs, endCellAttrs, startEventTarget, assign: selectionAssign, reset: selectionReset, selectionStyle, context: selectionContext } = useSelection({
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
const cols = ref<{
  key: string | number
  title: string
  width: number | string
}[]>([])
const firstDay = dayjs().startOf('M')
for (let i = 0; i < 30; i++) {
  cols.value.push({
    width: 120,
    title: firstDay.add(i, 'day').format('YYYY-MM-DD'),
    key: i
  })

}
for (let i = 0; i < 100; i++) {
  const tr = []
  for (let j = 0; j < 30; j++) {
    const td: IDataSourceItem = {
      value: undefined,// `${i}-${j}`,
      id: `${i}-${j}`,
      selected: false,
      readonly: false,
      disabled: false,
      editing: false,
      locked: false,
      note: ''

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
  if (selectionContext.el) {
    const rect = selectionContext.el.getBoundingClientRect()
    // console.log(rect)
    // e.clientX
    // e.clientY
    menuContext.show({
      x: rect.left + rect.width,
      y: rect.top + (rect.height / 2)
    })
  }

}
function getSelectionValues(start: ICellAttrs, end: ICellAttrs): IDataSourceItem[] {
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
  const offsetX = rect.left - centerRect.left  // containerLeft.value - selectionPosition.value.left
  const offsetY = rect.top - centerRect.top // containerTop.value - selectionPosition.value.top

  if (offsetX > 0) {
    // 右
    selectionPosition.value.right = rect.right + containerScrollX.value + windowX.value // - containerLeft.value
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
    selectionPosition.value.bottom = rect.bottom + containerScrollY.value + windowY.value // - containerTop.value
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

// function checkValid(e: MouseEvent) {
//   const el = e.target as HTMLElement
//   if (el.tagName !== 'TD') {
//     return false
//   }
//   return true
// }

function getTdElement(e: MouseEvent) {
  // @ts-ignore
  const path = e.path as Element[]
  if (Array.isArray(path)) {

    for (let i = 0; i < path.length; i++) {
      const element = path[i];
      // @ts-ignore
      if (element.tagName === 'TD' && element.dataset.sheetCell === '1') {
        return element
      }
    }
    return null
  } else {
    return null
  }

}
// https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/buttons
function onMousedown(e: MouseEvent, attrs: ICellAttrs) {
  const target = getTdElement(e)
  console.log('onMousedown', e)
  if (e.buttons === 1 && e.button === 0 && target) {
    startEventTarget.value = target
    const rect = getBoundingClientRect(startEventTarget.value)
    // 设置开始拖动
    if (shiftState.value) {
      startSelection.value = true
    }


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

  console.log('onMouseup', e)
  if (e.buttons === 0 && e.button === 0) {
    startSelection.value = false

    startCellAttrs.value = attrs
    if (endCellAttrs.value && startCellAttrs.value) {
      const values = getSelectionValues(endCellAttrs.value, startCellAttrs.value)
      selectionValues.value = values
    }
  }
}

function doLock() {
  selectionValues.value?.forEach(x => {
    if (x.value) {
      x.locked = true
    }

  })
  closeContextMenu()
}

function unlock() {
  selectionValues.value?.forEach(x => {

    x.locked = false
  })
  closeContextMenu()
}

const dblclickCellAttrs = ref<ICellAttrs>()

function onDblclick(e: MouseEvent, attrs: ICellAttrs) {
  console.log('onDblclick', e)
  const target = getTdElement(e)
  if (target) {
    const rect = target.getBoundingClientRect()

    valueSelectorContext.show({
      x: rect.left,
      y: rect.bottom
    })
    dblclickCellAttrs.value = attrs

  }

}



function _onMousemove(e: MouseEvent) {
  const target = getTdElement(e)
  if (target) {
    const el = target

    if (startSelection.value) {
      const rect = el.getBoundingClientRect()
      setMoveStyle(rect)
    }
  }

}

const onMousemove = throttle(_onMousemove, 20)

const selectValue: (e: MouseEvent, value: unknown) => void = (e, value) => {
  e.stopPropagation()
  if (dblclickCellAttrs.value) {
    dblclickCellAttrs.value.item.value = value
  }
}


const detailCellAttrs = ref<ICellAttrs>()

function onMouseenter(e: MouseEvent, attrs: ICellAttrs) {
  // console.log('onMouseenter',e)

  const target = getTdElement(e)
  if (target) {
    showDetailContext.close()
    if (attrs.item.value) {
      const rect = target.getBoundingClientRect()
      detailCellAttrs.value = attrs
      showDetailContext.show({
        x: rect.left,
        y: rect.bottom
      })
    }


  }

}

async function doNote() {
  if (selectionValues.value) {
    const single = selectionValues.value.length === 1
    const res = await MessageBox.prompt('', '添加备注', {
      inputType: 'textArea',
      inputValue: single ? selectionValues.value[0].note : '',
      inputPlaceholder: '请输入备注',
      closeOnClickModal: false,
      closeOnPressEscape: false
    })
    selectionValues.value?.forEach(x => {
      // @ts-ignore
      x.note = res.value
    })

  }


}

function onMouseleave(e: MouseEvent, attrs: ICellAttrs) {
  // console.log('onMouseleave',e)
  // const target = getTdElement(e)
  // if(target){
  //   showDetailContext.close()
  // }
}
</script>

<style lang="scss" scoped>
.has-note::after {
  // background-color: #3380FF;
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  height: 0;
  width: 0;
  border-top: 11px solid #3380FF;
  border-left: 13px solid transparent;
}
</style>
