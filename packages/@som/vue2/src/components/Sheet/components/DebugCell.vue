<template>
  <div ref="domRef" class="h-full w-full">x:{{ left }} y:{{ top }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue-demi'
import { useElementBounding } from '@vueuse/core'
const domRef = ref<HTMLDivElement | null>()
const { left, top } = useElementBounding(domRef)
</script>

<style scoped></style>
