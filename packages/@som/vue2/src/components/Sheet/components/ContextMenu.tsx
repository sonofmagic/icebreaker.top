import { defineComponent, ref } from 'vue-demi'
import { onClickOutside, useWindowScroll, useScroll, unrefElement } from '@vueuse/core'
// export function useContextMenu () {}

export default defineComponent({
  name: 'ContextMenu',
  setup () {
    const visible = ref(false)
    const menuRef = ref<HTMLDivElement>()

    function close () {
      visible.value = false
    }
    onClickOutside(menuRef, () => {
      close()
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
