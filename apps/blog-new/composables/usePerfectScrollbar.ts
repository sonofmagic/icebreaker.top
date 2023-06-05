import { MaybeElement, unrefElement } from '@vueuse/core'
import PerfectScrollbar from 'perfect-scrollbar'

export const usePerfectScrollbar = (options?: PerfectScrollbar.Options) => {
  const elRef = ref<Element | null>()
  const scrollbarRef = ref<PerfectScrollbar>()

  function registerRef(el: Element | MaybeElement | ComponentPublicInstance | null) {
    elRef.value = unrefElement(el)
  }

  onMounted(() => {
    if (elRef.value) {
      scrollbarRef.value = new PerfectScrollbar(elRef.value, options)
    }
  })

  onBeforeUnmount(() => {
    if (scrollbarRef.value) {
      scrollbarRef.value.destroy()
      scrollbarRef.value = undefined
    }
  })
  return {
    elRef,
    scrollbarRef,
    registerRef
  }
}
