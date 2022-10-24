import { defineComponent, ref } from 'vue-demi'
import type { IPosition } from '../../types'
import { computePosition, ReferenceElement, offset, flip } from '@floating-ui/dom'
export const ValueSelector = defineComponent({
  name: 'ValueSelector',
  setup() {
    const visible = ref(false)
    const dom = ref<HTMLDivElement>()

    function show(e: IPosition) {
      const virtualEl: ReferenceElement = {
        getBoundingClientRect() {
          return {
            x: e.x,
            y: e.y,
            left: e.x,
            top: e.y,
            width: 0,
            height: 0,
            bottom: 0,
            right: 0
          }
        }
      }
      if (dom.value) {
        // const rect = dom.value.getBoundingClientRect()

        computePosition(virtualEl, dom.value, {
          placement: 'bottom-start',
          middleware: [
            // offset({
            //   mainAxis: 10,
            //   alignmentAxis: -rect.height / 2
            // }),
            flip()
          ]
        }).then(({ x, y }) => {
          Object.assign(dom.value!.style, {
            left: `${x}px`,
            top: `${y}px`
          })
          visible.value = true
        })
      }
    }

    return {
      visible,
      dom
    }
  },
  render() {
    const arr = new Array(20).fill(0).map((_, idx) => idx)
    return (
      <div ref="dom" style={{ visibility: this.visible ? 'visible' : 'hidden' }} class="bg-white w-[360px] border absolute left-0 top-0">
        未定义
        <input class="border" placeholder="请输入" />
        <div class="overflow-auto h-[200px]">
          {arr.map((x) => {
            return <div>{x}</div>
          })}
        </div>
      </div>
    )
  }
})
