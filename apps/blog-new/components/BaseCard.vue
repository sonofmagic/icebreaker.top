<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'
import VanillaTilt from 'vanilla-tilt'
const card = ref<HTMLDivElement>()
const { elementX, elementY } = useMouseInElement(card)
onMounted(() => {
  card.value &&
    VanillaTilt.init(card.value, {
      max: 7.5
    })
})
</script>

<template>
  <div
    ref="card"
    :style="{
      '--x': `${elementX}px`,
      '--y': `${elementY}px`
    }"
    class="border-gradient group relative rounded-xl bg-gray-200 p-8 before:absolute before:-inset-px before:h-[calc(100%+2px)] before:w-[calc(100%+2px)] before:rounded-xl dark:bg-gray-700">
    <div
      class="absolute inset-0 rounded-[11px] bg-gray-50 transition-colors duration-300 dark:bg-[#202023] dark:group-hover:bg-[#27272a]" />

    <slot />
  </div>
</template>

<style lang="scss">
.border-gradient::before {
  background: radial-gradient(
    300px circle at var(--x) var(--y),
    #1cd1c6 0,
    #407cff 50%,
    transparent 100%
  );
}
</style>
