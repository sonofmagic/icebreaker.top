<template>
  <div>

    <div ref="container" class="relative">
      <div ref="table" class="table w-auto table-fixed border-collapse">
        <div class="table-row-group">
          <div class="table-row" :key="y" v-for="(row,y) in dataSet">
            <div class="table-cell border min-w-[120px] h-8 cursor-default select-none"
              @contextmenu.prevent="onContextmenu" @mousedown="onMousedown($event,{
                rowIndex:y,colIndex:x,item
              })" @mouseup="onMouseup($event,{
                rowIndex:y,colIndex:x,item
              })" @mousemove="onMousemove" :key="item.id" v-for="(item,x) in row">
              {{item.value}}
            </div>
          </div>
        </div>
      </div>

      <div class="absolute ring-2 ring-offset-0 ring-blue-600 pointer-events-none bg-gray-900 bg-opacity-10"
        :style="[selectionStyle]"></div>
      <!-- ring-2 ring-offset-0 ring-blue-600 -->

      <div :style="{'visibility':tooltipVisible?'visible':'hidden'}" ref="tooltip" class="absolute border bg-white">
        <div class="hover:bg-gray-200 px-4 py-1 cursor-pointer" @click="closeModal">
          复制
        </div>
        <div class="hover:bg-gray-200 px-4 py-1 cursor-pointer" @click="closeModal">
          粘贴
        </div>

      </div>

    </div>
  </div>

</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted } from 'vue-demi'
import { computePosition, ReferenceElement, offset } from '@floating-ui/dom'
// @ts-ignore
import ColumnResizer from 'column-resizer'
// @ts-ignore
import VirtualList from 'vue-virtual-scroll-list'
import { pick } from 'lodash-es'
import { onClickOutside, useWindowScroll } from '@vueuse/core'
import useContainer from './hooks/useContainer'



export default defineComponent({
  components: { VirtualList },
  setup() {
    const selectionBorderOffest = 0.5
    interface IDataSourceItem {
      value: string
      id: string
      selected: boolean
      readonly: boolean
      disabled: boolean
    }

    interface ICellAttrs {
      rowIndex: number, colIndex: number, item: IDataSourceItem
    }
    const { x: windowX, y: windowY } = useWindowScroll()
    const container = ref<HTMLDivElement>()
    const { left: containerLeft, top: containerTop } = useContainer(container)
    const dataSetSource: IDataSourceItem[][] = []
    for (let i = 0; i < 50; i++) {
      const tr = []
      for (let j = 0; j < 10; j++) {
        const td = {
          value: `${i}-${j}`,
          id: `${i}-${j}`,
          selected: false,
          readonly: false,
          disabled: false
        }
        tr.push(td)
      }
      dataSetSource.push(tr)
    }
    const dataSet = ref(dataSetSource)
    const startSelection = ref(false)
    const tooltipVisible = ref(false)
    const closeModal = () => {
      tooltipVisible.value = false
    }

    const tooltip = ref<HTMLDivElement>()
    const startCell = ref<EventTarget | null>()
    const selectionPosition = ref({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 0,
      height: 0,
    })

    const resetSelectionPosition = ref({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 0,
      height: 0,
    })
    const selectionStartCell = ref<ICellAttrs>()
    const selectionEndCell = ref<ICellAttrs>()
    const selectionStyle = computed(() => {
      return Object.entries(pick(selectionPosition.value, ['left', 'right', 'top', 'bottom', 'width', 'height'])).reduce<Record<string, string>>((acc, [key, value]) => {
        if (['left', 'right', 'top', 'bottom'].includes(key)) {
          acc[key] = (value - selectionBorderOffest) + 'px'
        } else {
          acc[key] = value + 'px'
        }

        return acc
      }, {})
    })

    function onContextmenu(e: MouseEvent) {
      const virtualEl: ReferenceElement = {
        getBoundingClientRect() {
          return {
            x: e.x,
            y: e.y,
            top: e.clientY,
            left: e.clientX,
            width: 0,
            height: 0,
            bottom: 0,
            right: 0
          }
        }
      }

      console.log(e)
      if (tooltip.value) {
        const rect = tooltip.value.getBoundingClientRect()
        console.log(rect)
        computePosition(virtualEl, tooltip.value, {
          placement: 'right',
          middleware: [offset({
            mainAxis: 10,
            alignmentAxis: -rect.height / 2
          })]
        }).then(({ x, y }) => {
          Object.assign(tooltip.value!.style, {
            left: `${x}px`,
            top: `${y}px`
          })
          tooltipVisible.value = true
        })
      }

      console.log('contextmenu')
    }
    function getSelectionValues(start: ICellAttrs, end: ICellAttrs) {
      const { colIndex: startcolIndex, rowIndex: startrowIndex } = start
      const { colIndex: endcolIndex, rowIndex: endrowIndex } = end
      const rows = [Math.min(startrowIndex, endrowIndex), Math.max(startrowIndex, endrowIndex) + 1]
      const cols = [Math.min(startcolIndex, endcolIndex), Math.max(startcolIndex, endcolIndex) + 1]
      const values = dataSet.value.slice(...rows).map(x => {
        return x.slice(...cols)
      })
      return values.flat(1)

    }

    function resetSelection(col?: 'x' | 'y') {
      if (col === 'x') {
        selectionPosition.value.width = resetSelectionPosition.value.width
        selectionPosition.value.left = resetSelectionPosition.value.left
        selectionPosition.value.right = resetSelectionPosition.value.right
      } else if (col === 'y') {
        selectionPosition.value.height = resetSelectionPosition.value.height
        selectionPosition.value.top = resetSelectionPosition.value.top
        selectionPosition.value.bottom = resetSelectionPosition.value.bottom
      } else {
        Object.assign(selectionPosition.value, resetSelectionPosition.value)
      }


    }

    function setMoveStyle(rect: DOMRect) {
      // console.log(rect.left, selectionPosition.value.left)
      const offsetX = rect.left - containerLeft.value - selectionPosition.value.left


      if (offsetX > 0) {
        // 右
        selectionPosition.value.right = rect.right + container.value!.scrollLeft + windowX.value //- containerLeft.value
        selectionPosition.value.width = Math.abs(offsetX) + rect.width

      } else if (offsetX < 0) {
        // 左

        selectionPosition.value.left = rect.left + container.value!.scrollLeft + windowX.value //- containerLeft.value

        selectionPosition.value.width = Math.abs(offsetX) + rect.width

      } else{
        resetSelection('x')
      }
      const offsetY = rect.top - containerTop.value - selectionPosition.value.top
      // console.log(rect.top, selectionPosition.value.top)
      if (offsetY > 0) {
        // 下
        selectionPosition.value.bottom = rect.bottom + container.value!.scrollTop + windowY.value //- containerTop.value
        selectionPosition.value.height = Math.abs(offsetY) + rect.height
      } else if (offsetY < 0) {
        // 上
        selectionPosition.value.top = rect.top + container.value!.scrollTop + windowY.value //- containerTop.value
        selectionPosition.value.height = Math.abs(offsetY) + rect.height
      }else{
        resetSelection('y')
      }
      console.log(offsetX, offsetY)
      // if (offsetX === 0 && offsetY === 0) {
      //   resetSelection()
      // }


    }
    // https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/buttons
    function onMousedown(e: MouseEvent, attrs: ICellAttrs) {
      if (e.buttons === 1) {
        startCell.value = e.target
        const rect = (<HTMLElement>startCell.value).getBoundingClientRect()

        startSelection.value = true
        console.log('onMousedown')

        console.log(rect, containerTop.value, containerLeft.value)
        selectionPosition.value.left = rect.left + container.value!.scrollLeft + windowX.value - containerLeft.value
        selectionPosition.value.right = rect.right + container.value!.scrollLeft + windowX.value - containerLeft.value
        selectionPosition.value.top = rect.top + container.value!.scrollTop + windowY.value - containerTop.value
        selectionPosition.value.bottom = rect.bottom + container.value!.scrollTop + windowY.value - containerTop.value

        selectionPosition.value.width = rect.width
        selectionPosition.value.height = rect.height


        selectionStartCell.value = attrs
        Object.assign(resetSelectionPosition.value, selectionPosition.value)
      }
    }

    function onMouseup(e: MouseEvent, attrs: ICellAttrs) {
      if (e.buttons === 0) {
        startSelection.value = false
        console.log('onMouseup')
        selectionEndCell.value = attrs
        if (selectionStartCell.value && selectionEndCell.value) {
          const values = getSelectionValues(selectionStartCell.value, selectionEndCell.value)
          console.log(values)
        }

      }
    }


    function onMousemove(e: MouseEvent) {
      if (startSelection.value) {
        console.log('onMousemove', e.target)
        const rect = (<HTMLElement>e.target).getBoundingClientRect()
        // console.log(rect, selectionPosition.value)
        setMoveStyle(rect)

      }
    }
    onClickOutside(tooltip, () => {
      closeModal()
    })



    return {
      dataSet,
      startSelection,
      tooltipVisible,
      closeModal,
      tooltip,
      onContextmenu,
      onMousedown,
      onMouseup,
      onMousemove,
      selectionStyle,
      selectionEndCell,
      selectionStartCell,
      container,


    }
  }

})
</script>

<style lang="scss" scoped>

</style>
