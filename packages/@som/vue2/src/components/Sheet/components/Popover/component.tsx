import { defineComponent, ref, PropType, watch, toRefs } from 'vue-demi'
import type { IPosition } from '../../types'
import { computePosition, ReferenceElement, offset, flip, Placement } from '@floating-ui/dom'
import type { IPopoverContext } from './type'
import { onClickOutside } from '@vueuse/core'
export const Popover = defineComponent({
  name: 'SheetPopover',
  props: {
    context: {
      type: Object as PropType<IPopoverContext>
    },
    placement: {
      type: String as PropType<Placement>
    }
  },
  setup(props) {
    const visible = ref(false)
    const { context, placement } = toRefs(props)
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
          placement: placement.value,
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
    return (
      <div ref="dom" style={{ visibility: this.visible ? 'visible' : 'hidden' }} class="absolute left-0 top-0">
        {this.$slots.default}
      </div>
    )
  }
})
