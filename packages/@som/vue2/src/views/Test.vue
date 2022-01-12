<template>
  <div ref="dom">1234
    <div
      :key="i"
      v-for="i in count"
    >{{i}}</div>
    <button @click="insertSpanNode">Click</button>
  </div>
</template>

<script lang="ts">
// IntersectionObserver
import {
  defineComponent,
  ref,
  onBeforeUnmount,
  onMounted
} from '@vue/composition-api'

const callback: MutationCallback = (mutationList, observer) => {
  console.log(mutationList)
  mutationList.forEach((mutation) => {
    switch (mutation.type) {
      case 'childList':

        /* One or more children have been added to and/or removed
           from the tree.
           (See mutation.addedNodes and mutation.removedNodes.) */
        break
      case 'attributes':

        /* An attribute value changed on the element in
           mutation.target.
           The attribute name is in mutation.attributeName, and
           its previous value is in mutation.oldValue. */
        break
    }
  })
}
export default defineComponent({
  setup (props) {
    const dom = ref<HTMLDivElement | null>(null)
    const count = ref(0)
    const observer = new MutationObserver(callback)

    const spanDom = document.createElement('span')
    spanDom.innerText = 'spanDom'
    const insertSpanNode = () => {
      dom.value?.appendChild(spanDom)
    }
    onMounted(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      observer.observe(spanDom, {
        childList: true,
        attributes: true,
        subtree: true
      })
      // observer.observe(dom.value, {
      //   childList: true,
      //   attributes: true,
      //   subtree: true
      // })
    })
    onBeforeUnmount(() => {
      observer.disconnect()
    })
    return {
      dom,
      count,
      insertSpanNode
    }
  }
})
</script>

<style>
</style>
