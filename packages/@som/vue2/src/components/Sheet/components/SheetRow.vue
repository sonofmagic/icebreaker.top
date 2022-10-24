<template>
  <div>
    <div class="table-cell border min-w-[100px] h-[50px] cursor-default select-none"
      @contextmenu.prevent="onContextmenu" @mousedown="onMousedown($event, {
        rowIndex: index, colIndex: x, item
      })" @mouseup="onMouseup($event, {
  rowIndex: index, colIndex: x, item
})" @mousemove="onMousemove($event, {
  rowIndex: index, colIndex: x, item
})" :key="item.id" v-for="(item,x) in source.cells">

      {{ item.value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IDataSourceRow, ISheetRowCustomEvent, ICellAttrs } from '../types'

import { toRefs } from 'vue-demi'
const props = defineProps<{
  index: number
  source: IDataSourceRow
}>()

const emit = defineEmits(['contextmenu', 'mousedown', 'mouseup', 'mousemove'])
const { source, index } = toRefs(props)
const onContextmenu = (e: MouseEvent) => {
  emit('contextmenu', e)
}

const onMousedown = (event: MouseEvent, attrs: ICellAttrs) => {
  emit('mousedown', <ISheetRowCustomEvent>{
    event,
    attrs
  })
}

const onMouseup = (event: MouseEvent, attrs: ICellAttrs) => {
  emit('mouseup', <ISheetRowCustomEvent>{
    event,
    attrs
  })
}

const onMousemove = (event: MouseEvent, attrs: ICellAttrs) => {
  emit('mousemove', <ISheetRowCustomEvent>{
    event,
    attrs
  })
}
</script>

<style scoped>

</style>
