import { defineComponent, ref, toRefs, Ref, onMounted, watch } from 'vue-demi'
import { onClickOutside, useWindowScroll, useScroll, unrefElement } from '@vueuse/core'
import { computePosition, ReferenceElement, offset } from '@floating-ui/dom'
interface IContextMenuContext {
  close: () => void
  show: (e: MouseEvent) => void
  el?: HTMLDivElement
}

interface IContextMenuProps {
  context?: IContextMenuContext
}

export function useContextMenu () {
  const context: IContextMenuContext = {
    show () {
      throw new Error('context is null')
    },
    close () {
      throw new Error('context is null')
    },
    el: undefined
  }
  return {
    context
  }
}

export default defineComponent({
  name: 'ContextMenu',
  props: {
    context: []
  },
  setup (props: IContextMenuProps) {
    const { context } = toRefs(props)

    const visible = ref(false)
    const menuRef = ref<HTMLDivElement>()

    function close () {
      visible.value = false
    }

    function show (e: MouseEvent) {
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
      if (menuRef.value) {
        const rect = menuRef.value.getBoundingClientRect()
        console.log(rect)
        computePosition(virtualEl, menuRef.value, {
          placement: 'right',
          middleware: [
            offset({
              mainAxis: 10,
              alignmentAxis: -rect.height / 2
            })
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
    onMounted(() => {
      if (context?.value) {
        context.value.el = menuRef.value
        context.value.close = close
        context.value.show = show
      }
    })

    return {
      visible,
      menuRef,
      close
    }
  },
  render () {
    return (
      <div style={{ visibility: this.visible ? 'visible' : 'hidden' }} ref="menuRef" class="absolute border bg-white">
        <div class="hover:bg-gray-200 px-4 py-1 cursor-pointer" onClick={this.close}>
          复制
        </div>
        <div class="hover:bg-gray-200 px-4 py-1 cursor-pointer" onClick={this.close}>
          粘贴
        </div>
      </div>
    )
  }
})
