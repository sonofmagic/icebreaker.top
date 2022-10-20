<template>
  <div ref="container" class="relative h-[80vh] overflow-auto">
    <div class="table w-auto table-fixed border-collapse">
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
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue-demi'
import { computePosition, ReferenceElement, offset } from '@floating-ui/dom'

import { pick } from 'lodash-es'
import { useKeyModifier, onClickOutside } from '@vueuse/core'
export default defineComponent({

  setup() {
    const selectionBorderOffest = 1
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

    const container = ref<HTMLDivElement>()
    const shiftState = useKeyModifier('Shift')
    const controlState = useKeyModifier('Control')
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
    function createSelection() {
      const dom = document.createElement('div')
    }
    const tooltip = ref<HTMLDivElement>()

    const selectionPosition = ref({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    })
    const selectionStartCell = ref<ICellAttrs>()
    const selectionEndCell = ref<ICellAttrs>()
    const selectionStyle = computed(() => {
      return Object.entries(pick(selectionPosition.value, ['left', 'right', 'top', 'bottom', 'width', 'height'])).reduce<Record<string, string>>((acc, [key, value]) => {
        acc[key] = value + 'px'
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


    // https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/buttons
    function onMousedown(e: MouseEvent, attrs: ICellAttrs) {
      if (e.buttons === 1) {
        startSelection.value = true
        console.log('onMousedown')

        const rect = (<HTMLElement>e.target).getBoundingClientRect()

        console.log(rect)
        selectionPosition.value.left = rect.left + container.value!.scrollLeft - selectionBorderOffest
        selectionPosition.value.top = rect.top + container.value!.scrollTop - selectionBorderOffest
        selectionPosition.value.bottom = rect.bottom + container.value!.scrollTop - selectionBorderOffest
        selectionPosition.value.right = rect.right + container.value!.scrollLeft - selectionBorderOffest
        selectionPosition.value.width = rect.width
        selectionPosition.value.height = rect.height
        selectionPosition.value.x = rect.x
        selectionPosition.value.y = rect.y
        selectionStartCell.value = attrs
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
        console.log('onMousemove')
        const rect = (<HTMLElement>e.target).getBoundingClientRect()
        // console.log(rect, selectionPosition.value)

        if (rect.x > selectionPosition.value.x) {
          // 右
          selectionPosition.value.right = rect.right + container.value!.scrollLeft - selectionBorderOffest

        } else {
          // 左
          selectionPosition.value.left = rect.left + container.value!.scrollLeft - selectionBorderOffest

        }
        selectionPosition.value.width = Math.abs(rect.x - selectionPosition.value.x) + rect.width

        if (rect.y > selectionPosition.value.y) {
          // 下
          selectionPosition.value.bottom = rect.bottom + container.value!.scrollTop - selectionBorderOffest
        } else {
          // 上
          selectionPosition.value.top = rect.top + container.value!.scrollTop - selectionBorderOffest
        }
        selectionPosition.value.height = Math.abs(rect.y - selectionPosition.value.y) + rect.height
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
