<template>
  <div class="relative flex overflow-x-auto">
    <VirtualList ref="containerRef" @scroll="onContainerScroll" header-class="bg-white z-10 sticky top-0 left-0" table-class="w-auto table-fixed border-collapse text-center bg-white" class="relative overflow-y-auto" :data-key="'key'" :data-sources="dataSource" :data-component="itemComponent">
      <template #colgroup>
        <col
          :key="col.key"
          :style="{
            'min-width': col.width + 'px'
          }"
          :width="col.width"
          v-for="col in columns"
        />
      </template>
      <template #append>
        <Selection :context="selectionContext" :style-object="selectionStyle"></Selection>
        <ContextMenu :context="menuContext">
          <div class="w-32 text-center">
            <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="closeContextMenu">复制</div>
            <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="closeContextMenu">粘贴</div>
            <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="doLock">锁定</div>
            <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="unlock">解锁</div>
            <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="doNote">备注</div>
            <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="closeContextMenu">行/列复制</div>
            <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="closeContextMenu">复制上一区间</div>
            <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="doSetValue(1)">set(1)</div>
            <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="doSetValue(2)">set(2)</div>
            <div class="hover:bg-blue-200 hover:text-blue-600 px-4 py-1 cursor-pointer" @click="doSetValue()">clear</div>
          </div>
        </ContextMenu>
        <Popover :context="valueSelectorContext" placement="bottom-start">
          <div class="bg-white w-[360px] p-2 border">
            <div>未定义</div>
            <input class="border" placeholder="请输入" />
            <div class="overflow-auto h-[200px]">
              <div :key="i" v-for="i in 30" @click="selectValue($event, i)" class="flex justify-around cursor-pointer hover:bg-blue-300">
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
      </template>

      <!-- <template #header>
        <tr>
          <th :key="i" v-for="(t, i) in columns" class="p-0 h-[48px] text-center border border-[#EEF0F4] cursor-pointer">
            {{ t.title }}
          </th>
        </tr>
      </template> -->
    </VirtualList>
  </div>
</template>

<script lang="ts" setup>
import itemComponent from './Item.vue'
import VirtualList from './components/VirtualList'
import { MessageBox } from 'element-ui'
import { computed, defineComponent, ref, onMounted, nextTick, reactive, watch, toRefs, provide } from 'vue-demi'
import { pick, throttle, forEach } from 'lodash-es'
import { onClickOutside, useWindowScroll, useScroll, unrefElement } from '@vueuse/core'
import { useContainer, useDataSource, useKeyBoard } from './hooks'
import { getDirection, getBoundingClientRect } from './utils'
import type { IDataSourceItem, IDataSourceRow, ICellAttrs, IScrollOffset, IColumn } from './types'
import { useContextMenu, ContextMenu } from './components/ContextMenu'
import { useSelection, Selection } from './components/Selection'
import { Popover, usePopover } from './components/Popover'
import { CellEventsSymbol } from './contexts/CellEvents'
const { context: valueSelectorContext } = usePopover()
const { context: showDetailContext } = usePopover()
const { x: windowX, y: windowY } = useWindowScroll()
const { shiftState, controlState } = useKeyBoard()

const { context: menuContext } = useContextMenu()
const containerRef = ref<HTMLDivElement>()
const { left: containerLeft, top: containerTop, scrollX: containerScrollX, scrollY: containerScrollY } = useContainer(containerRef)

const {
  resetSelectionPosition,
  selectionPosition,
  startCellAttrs,
  endCellAttrs,
  startEventTarget,
  assign: selectionAssign,
  reset: selectionReset,
  selectionStyle,
  context: selectionContext
} = useSelection({
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

const emit = defineEmits<{
  (e: 'scroll', payload: IScrollOffset): void
}>()

const props = defineProps<{
  dataSource: IDataSourceRow[]
  columns: IColumn[]
}>()
const { columns, dataSource } = toRefs(props)

const currentSelectionValues = ref<IDataSourceItem[]>()
const startSelection = ref(false)
const selectedCellSet = ref(new Set<IDataSourceItem>())

const closeContextMenu = () => {
  menuContext.close()
}

function onContextmenu(e: MouseEvent, attrs: ICellAttrs) {
  e.preventDefault()
  if (selectionContext.el) {
    const rect = getBoundingClientRect(selectionContext.el)
    menuContext.show({
      x: rect.left + rect.width,
      y: rect.top + rect.height / 2
    })
  }
}
function getCurrentSelectionValues(start: ICellAttrs, end: ICellAttrs): IDataSourceItem[] {
  const { colIndex: startcolIndex, rowIndex: startrowIndex } = start
  const { colIndex: endcolIndex, rowIndex: endrowIndex } = end
  const rows = [Math.min(startrowIndex, endrowIndex), Math.max(startrowIndex, endrowIndex) + 1]
  const cols = [Math.min(startcolIndex, endcolIndex), Math.max(startcolIndex, endcolIndex) + 1]
  const values = dataSource.value.slice(...rows).map((x) => {
    return x.cells.slice(...cols)
  })
  return values.flat(1)
}

function setMoveStyle(rect: DOMRect) {
  // console.log(rect.left, selectionPosition.value.left)
  const originPointRect = getBoundingClientRect(startEventTarget.value)
  // console.log(originPointRect)
  const offsetX = rect.left - originPointRect.left // containerLeft.value - selectionPosition.value.left
  const offsetY = rect.top - originPointRect.top // containerTop.value - selectionPosition.value.top

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
      const element = path[i]
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
  // console.log('onMousedown', e)

  if (e.buttons === 1 && e.button === 0 && target) {
    if (shiftState.value) {
      if (startEventTarget.value) {
        const rect = getBoundingClientRect(target)
        selectionReset()
        setMoveStyle(rect)
        // console.log(startEventTarget.value,target)
      }
      return
    }
    if (!controlState.value) {
      resetDataSetSelected()
      // forEach(currentSelectionValues.value, x => {
      //   x.selected = true
      // })
    }

    startEventTarget.value = target
    const rect = getBoundingClientRect(startEventTarget.value)
    // 设置开始拖动
    if (controlState.value) {
      startSelection.value = true
    }

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

function selectCellOver(attrs: ICellAttrs) {
  startSelection.value = false
  startCellAttrs.value = attrs
  if (endCellAttrs.value && startCellAttrs.value) {
    let d: ICellAttrs = startCellAttrs.value
    // console.log(controlState.value,shiftState.value)
    // 避免不按ctrl时拖动选中多个cell
    if (!controlState.value) {
      d = endCellAttrs.value
    }
    // shfit 时点击其他选择多个
    if (shiftState.value) {
      d = startCellAttrs.value
    }

    const values = getCurrentSelectionValues(endCellAttrs.value, d)
    currentSelectionValues.value = values
    // forEach(currentSelectionValues.value, x => {
    //     x.selected = true
    //   })
    forEach(values, (x) => {
      x.selected = true
      selectedCellSet.value.add(x)
    })
  }
}

function onMouseup(e: MouseEvent, attrs: ICellAttrs) {
  // console.log('onMouseup', e)
  if (e.buttons === 0 && e.button === 0) {
    selectCellOver(attrs)
  }
}

function doLock() {
  selectedCellSet.value?.forEach((x) => {
    if (x.value) {
      x.locked = true
    }
  })
  closeContextMenu()
}

function unlock() {
  selectedCellSet.value?.forEach((x) => {
    x.locked = false
  })
  closeContextMenu()
}

const dblclickCellAttrs = ref<ICellAttrs>()

function onDblclick(e: MouseEvent, attrs: ICellAttrs) {
  // console.log('onDblclick', e)
  const target = getTdElement(e)
  if (target) {
    const rect = getBoundingClientRect(target)

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
    if (startSelection.value) {
      const rect = getBoundingClientRect(target)
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
      const rect = getBoundingClientRect(target)
      detailCellAttrs.value = attrs
      showDetailContext.show({
        x: rect.left,
        y: rect.bottom
      })
    }
  }
}

async function doNote() {
  if (selectedCellSet.value) {
    const single = selectedCellSet.value.size === 1
    const defaultNote = single ? Array.from(selectedCellSet.value.values())[0].note : ''
    const res = await MessageBox.prompt('', '添加备注', {
      inputType: 'textArea',
      inputValue: defaultNote,
      inputPlaceholder: '请输入备注',
      closeOnClickModal: false,
      closeOnPressEscape: false
    })
    selectedCellSet.value?.forEach((x) => {
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

function resetDataSetSelected() {
  forEach(dataSource.value, (x) => {
    forEach(x.cells, (y) => {
      y.selected = false
    })
  })
  selectedCellSet.value.clear()
}

function doSetValue(value?: number) {
  selectedCellSet.value.forEach((x) => {
    x.value = value
  })
  closeContextMenu()
}

// watch(() => {
//   return controlState.value
// }, (nv) => {
//   if (nv) {

//   } else {
//     dataSet.value.forEach(x => {
//       x.cells.forEach(y => {
//         y.selected = false
//       })
//     })
//   }

// })

function onContainerScroll(payload: UIEvent) {
  // @ts-ignore
  // console.log(payload.target.scrollLeft, payload.target.scrollTop)

  emit('scroll', {
    // @ts-ignore
    scrollLeft: payload.target?.scrollLeft ?? 0,
    // @ts-ignore
    scrollTop: payload.target?.scrollTop ?? 0
  })
}
provide(
  CellEventsSymbol,
  reactive({
    contextmenu: onContextmenu,
    dblclick: onDblclick,
    mousedown: onMousedown,
    mouseenter: onMouseenter,
    mouseleave: onMouseleave,
    mousemove: onMousemove,
    mouseup: onMouseup
  })
)
</script>

<style lang="scss">
.has-note::after {
  // background-color: #3380FF;
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  height: 0;
  width: 0;
  border-top: 11px solid #3380ff;
  border-left: 13px solid transparent;
}

.sheet-cell-selected::before {
  position: absolute;
  content: '';
  left: 1px;
  right: 1px;
  top: 1px;
  bottom: 1px;
  @apply bg-gray-900 bg-opacity-10;
}
</style>
