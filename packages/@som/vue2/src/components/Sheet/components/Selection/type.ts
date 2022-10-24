import { computed, defineComponent, ref, onMounted, Ref } from 'vue-demi'

export interface ISelectionRect {
  left: number
  right: number
  top: number
  bottom: number
  width: number
  height: number
}

export interface useSelectionOptions {
  window: {
    scrollX: Ref<number>
    scrollY: Ref<number>
  }
  container: {
    left: Ref<number>
    top: Ref<number>
    scrollX: Ref<number>
    scrollY: Ref<number>
  }
}

export interface ISelectionContext {
  el?: HTMLDivElement
  // getBoundingClientRect?: () => DOMRect
  // style: Record<string, string>
}
