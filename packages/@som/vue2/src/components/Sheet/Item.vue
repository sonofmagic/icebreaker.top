<template>
  <tr>
    <td :key="cell.id" v-for="cell in source.cells">
      <slot :index="index" :source="source" :item="cell"></slot>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { IDataSourceRow } from './types'
import { toRefs } from 'vue-demi'
const props = defineProps<{
  // rowIndex
  index: number
  source: IDataSourceRow
}>()
const { index, source } = toRefs(props)
</script>
