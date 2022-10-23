<template>
  <td class="border min-w-[100px] h-[50px] cursor-default select-none" @contextmenu.prevent="onContextmenu"
    @mousedown="onMousedown" @mouseup="onMouseup" @mousemove="onMousemove">

    {{source.value}}
  </td>
</template>

<script setup lang="ts">
import type { IDataSourceItem } from '../hooks/useSelection'
import { toRefs } from 'vue-demi'
const props = defineProps<{
  index: number
  source: IDataSourceItem
}>()

const emit = defineEmits(['contextmenu', 'mousedown', 'mouseup', 'mousemove'])
const { source, index } = toRefs(props)
const onContextmenu = (e: MouseEvent) => {

}
</script>

<style scoped>

</style>
