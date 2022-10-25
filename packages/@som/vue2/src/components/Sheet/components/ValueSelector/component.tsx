import { defineComponent, ref, PropType, watch, toRefs } from 'vue-demi'
import type { IPosition } from '../../types'
import { computePosition, ReferenceElement, offset, flip } from '@floating-ui/dom'
import type { IValueSelectorContext } from './type'
import { onClickOutside } from '@vueuse/core'
export const ValueSelector = defineComponent({
  name: 'ValueSelector',
  props: {
    context: {
      type: Object as PropType<IValueSelectorContext>
    }
  },
  emits: ['select'],
  setup(props) {
    const visible = ref(false)
    const { context } = toRefs(props)
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
            offset({
              mainAxis: 5
              // alignmentAxis: -rect.height / 2
            }),
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
    function close() {
      visible.value = false
    }
    watch(
      () => {
        return dom.value
      },
      () => {
        if (context.value) {
          context.value.el = dom.value
          context.value.show = show
          context.value.close = close
        }
      }
    )

    onClickOutside(dom, () => {
      close()
    })

    return {
      visible,
      dom
    }
  },
  render() {
    const arr = new Array(20).fill(0).map((_, idx) => idx)
    const select: (e: MouseEvent, value: unknown) => void = (e, v) => {
      e.stopPropagation()
      this.$emit('select', v)
    }
    return (
      <div ref="dom" style={{ visibility: this.visible ? 'visible' : 'hidden' }} class="bg-white w-[360px] border absolute left-0 top-0 p-2">
        <div>未定义</div>
        <input class="border" placeholder="请输入" />
        <div class="overflow-auto h-[200px]">
          {arr.map((x) => {
            return (
              <div onClick={(e) => select(e, x)} class="flex justify-around cursor-pointer hover:bg-blue-300">
                <div class="flex-1">撒大声地</div>
                <div class="flex-1">{x}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
})
