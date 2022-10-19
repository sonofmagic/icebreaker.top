<template>
  <div class="relative">
    <table class="w-auto table-fixed ">
      <tbody>
        <tr :key="y" v-for="(row,y) in dataSet">
          <td class="border min-w-[120px] h-8 cursor-default select-none" @contextmenu.prevent="onContextmenu"
            @mousedown="onMousedown" @mouseup="onMouseup" @mousemove="onMousemove" :key="td.id" v-for="(td,x) in row">
            {{td.value}}
          </td>
        </tr>
      </tbody>
    </table>
    <OnClickOutside @trigger="closeModal">
      <div :style="{'visibility':tooltipVisible?'visible':'hidden'}" ref="tooltip" class="absolute border bg-white">
        <div class="hover:bg-gray-200 px-4 py-1 cursor-pointer">
          复制
        </div>
        <div class="hover:bg-gray-200 px-4 py-1 cursor-pointer">
          粘贴
        </div>

      </div>
    </OnClickOutside>
    <div class="absolute border-[#3380FF] pointer-events-none" :style="[selectionStyle]"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue-demi'
import { computePosition, ReferenceElement, offset } from '@floating-ui/dom'
import { OnClickOutside } from '@vueuse/components'
export default defineComponent({
  components: { OnClickOutside },
  setup () {
    const dataSetSource = []
    for (let i = 0; i < 10; i++) {
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
    function createSelection () {
      const dom = document.createElement('div')
    }
    const tooltip = ref<HTMLDivElement>()
    const selectionStyle = ref({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 0,
      height: 0
    })
    function onContextmenu (e: MouseEvent) {
      const virtualEl: ReferenceElement = {
        getBoundingClientRect () {
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
    // https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/buttons
    function onMousedown (e: MouseEvent) {
      if (e.buttons === 1) {
        startSelection.value = true
        console.log('onMousedown', e.target)
        // @ts-ignore
        const rect = (<HTMLElement>e.target).getBoundingClientRect()
        console.log(rect)
        selectionStyle.value.left = rect.left
        selectionStyle.value.top = rect.top
        selectionStyle.value.bottom = rect.bottom
        selectionStyle.value.right = rect.right
        selectionStyle.value.width = rect.width
        selectionStyle.value.height = rect.height
      }
    }

    function onMouseup (e: MouseEvent) {
      if (e.buttons === 0) {
        startSelection.value = false
        console.log('onMouseup')
      }
    }

    function onMousemove () {
      if (startSelection.value) {
        console.log('onMousemove')
      }
    }
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
      selectionStyle
    }
  }

})
</script>

<style lang="scss" scoped>

</style>
