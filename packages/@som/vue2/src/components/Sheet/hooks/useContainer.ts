import { useElementBounding, MaybeElement } from '@vueuse/core'
import type { Ref } from 'vue-demi'
export default function useContainer (el: Ref<MaybeElement>) {
  const { x, y, top, right, bottom, left, width, height, update } = useElementBounding(el)
  return {
    x,
    y,
    top,
    right,
    bottom,
    left,
    width,
    height,
    update
  }
}
