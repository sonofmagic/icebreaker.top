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
      <div v-show="tooltipVisible" ref="tooltip" class="absolute border bg-white">
        <div class="hover:bg-gray-200 px-4 py-1 cursor-pointer">
          复制
        </div>
        <div class="hover:bg-gray-200 px-4 py-1 cursor-pointer">
          粘贴
        </div>

      </div>
    </OnClickOutside>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { computePosition } from '@floating-ui/dom'
import { OnClickOutside } from '@vueuse/components'
export default defineComponent({
  components: { OnClickOutside },
  data () {
    const dataSet = []
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
      dataSet.push(tr)
    }
    return {
      dataSet,
      startSelection: false,
      tooltipVisible: false
    }
  },
  methods: {
    closeModal () {
      this.tooltipVisible = false
    },
    createSelection () {
      const dom = document.createElement('div')
    },
    onContextmenu (e: PointerEvent) {
      const virtualEl = {
        getBoundingClientRect () {
          return {
            x: e.x,
            y: e.y,
            top: e.clientY,
            left: e.clientX,
            width: 0,
            height: 0
          }
        }
      }

      console.log(e)
      // @ts-ignore
      computePosition(virtualEl, this.$refs.tooltip, {
        placement: 'right'
      }).then(({ x, y }) => {
        // @ts-ignore
        Object.assign(this.$refs.tooltip.style, {
          left: `${x}px`,
          top: `${y}px`
        })
        this.tooltipVisible = true
      })
      console.log('contextmenu')
    },
    onMousedown (e: PointerEvent) {
      if (e.button === 1) {
        this.startSelection = true
        console.log('onMousedown')
      }
    },
    onMouseup (e: PointerEvent) {
      if (e.button === 1) {
        this.startSelection = false
        console.log('onMouseup')
      }
    },
    // onClick (item: any, y: number, x: number, e: Event) {
    //   const dom = e.target
    //   console.log(e)
    //   item.selected = true
    // },
    onMousemove () {
      if (this.startSelection) {
        console.log('onMousemove')
      }
    }
  }

})
</script>

<style lang="scss" scoped>

</style>
