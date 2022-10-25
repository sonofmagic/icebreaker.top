import { useElementBounding, MaybeElement, useScroll } from '@vueuse/core'
import type { Ref } from 'vue-demi'
export default function useContainer(el: Ref<HTMLElement | null | undefined>) {
  const { x, y, top, right, bottom, left, width, height, update } = useElementBounding(el)
  const { x: scrollX, y: scrollY, directions, isScrolling, arrivedState } = useScroll(el)
  return {
    x,
    y,
    top,
    right,
    bottom,
    left,
    width,
    height,
    update,
    directions,
    isScrolling,
    arrivedState,
    scrollX,
    scrollY
  }
}
