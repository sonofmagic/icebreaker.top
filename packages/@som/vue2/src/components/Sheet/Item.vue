<template>
  <Fragment>
    <td :key="cell.id" v-for="(cell, colIndex) in source.cells" class="border" style="min-width: 120px; height: 48px">
      <slot :rowIndex="index" :colIndex="colIndex" :source="source" :item="cell">{{ cell.id }}</slot>
    </td>
  </Fragment>
</template>

<script lang="ts" setup>
import { Fragment } from 'vue-fragment'
import { IDataSourceRow } from './types'
import { toRefs } from 'vue-demi'
const props = defineProps<{
  // rowIndex
  index: number
  source: IDataSourceRow
}>()
const { index, source } = toRefs(props)
</script>
