import { defineComponent, ref, toRefs, Ref, onMounted, watch, PropType } from 'vue-demi'
import { onClickOutside } from '@vueuse/core'
import { computePosition, ReferenceElement, offset, flip } from '@floating-ui/dom'
import { IContextMenuContext, IContextMenuProps } from './type'
import { IPosition } from '../../types'
export const ContextMenu = defineComponent({
  name: 'ContextMenu',
  props: {
    context: {
      type: Object as PropType<IContextMenuContext>
    }
  },
  setup(props) {
    const { context } = toRefs(props)

    const visible = ref(false)
    const menuRef = ref<HTMLDivElement>()

    function close() {
      visible.value = false
    }

    function show(e: IPosition) {
      const virtualEl: ReferenceElement = {
        getBoundingClientRect() {
          return {
            x: e.x, // e.x,
            y: e.y, // e.y,
            left: e.x,
            top: e.y,
            width: 0,
            height: 0,
            bottom: 0,
            right: 0
          }
        }
      }
      if (menuRef.value) {
        const rect = menuRef.value.getBoundingClientRect()
        console.log(rect)
        computePosition(virtualEl, menuRef.value, {
          placement: 'right',
          middleware: [
            offset({
              mainAxis: 10,
              alignmentAxis: -rect.height / 2
            }),
            flip()
          ]
        }).then(({ x, y }) => {
          Object.assign(menuRef.value!.style, {
            left: `${x}px`,
            top: `${y}px`
          })
          visible.value = true
        })
      }
    }
    onClickOutside(menuRef, () => {
      close()
    })

    // if (context?.value) {
    //   context.value.close = close
    //   context.value.show = show
    // }

    watch(
      () => menuRef.value,
      () => {
        if (context?.value) {
          context.value.el = menuRef.value
          context.value.close = close
          context.value.show = show
        }
      }
    )

    return {
      visible,
      menuRef,
      close
    }
  },
  render() {
    return (
      <div style={{ visibility: this.visible ? 'visible' : 'hidden' }} ref="menuRef" class="absolute border bg-white left-0 top-0">
        {this.$slots.default}
      </div>
    )
  }
})
