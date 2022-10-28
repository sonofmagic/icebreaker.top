<template>
  <Fragment>
    <td
      :key="item.id"
      v-for="(item, colIndex) in source.cells"
      data-sheet-cell="1"
      class="p-0 border border-[#EEF0F4] h-[48px] cursor-default select-none relative"
      :class="[item.selected ? 'sheet-cell-selected' : '']"
      @contextmenu.prevent="
        contextmenu($event, {
          rowIndex,
          colIndex,
          item
        })
      "
      @mousedown="
        mousedown($event, {
          rowIndex,
          colIndex,
          item
        })
      "
      @mouseup="
        mouseup($event, {
          rowIndex,
          colIndex,
          item
        })
      "
      @mousemove="
        mousemove($event, {
          rowIndex,
          colIndex,
          item
        })
      "
      @dblclick="
        dblclick($event, {
          rowIndex,
          colIndex,
          item
        })
      "
      @mouseleave="
        mouseleave($event, {
          rowIndex,
          colIndex,
          item
        })
      "
      @mouseenter="
        mouseenter($event, {
          rowIndex,
          colIndex,
          item
        })
      "
    >
      <!-- <slot :rowIndex="rowIndex" :colIndex="colIndex" :source="source" :item="item">

      </slot> -->
      <div
        v-if="item.value"
        :class="{
          'cursor-pointer': Boolean(item.value),
          'has-note': Boolean(item.note)
        }"
        class="sheet-cell-inner select-none pointer-events-auto relative w-full h-full flex justify-between border-l-[2px] border-blue-600"
      >
        <div class="text-left flex flex-col justify-evenly pl-1.5">
          <div class="text-[13px] text-[#333333]">加科技看看{{ item.value }}</div>
          <div class="text-xs text-[#B1B9CC]">15:30-18:00</div>
        </div>
        <div class="text-xs flex items-center pr-1.5">{{ item.locked ? '锁' : '' }}</div>
      </div>
    </td>
  </Fragment>
</template>

<script lang="ts" setup>
import { Fragment } from 'vue-fragment'
import { IDataSourceRow } from './types'
import { toRefs, inject } from 'vue-demi'
import { CellEventsSymbol, ICellEvents } from './contexts/CellEvents'
const props = defineProps<{
  // rowIndex
  index: number
  source: IDataSourceRow
}>()

const events = inject(CellEventsSymbol, {})
const { contextmenu, dblclick, mousedown, mouseenter, mouseleave, mousemove, mouseup } = (events ?? {}) as Required<ICellEvents>

const { index: rowIndex, source } = toRefs(props)
</script>
