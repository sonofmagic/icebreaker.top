import type { ObjectDirective } from 'vue'

export const vScroll: ObjectDirective = {
  mounted(el, binding, vnode, prevNode) {
    console.log(el, binding, vnode, prevNode)
  },
  unmounted() { }
}
