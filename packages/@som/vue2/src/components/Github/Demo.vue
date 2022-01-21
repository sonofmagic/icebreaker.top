<template>
  <div>
    <!-- <ContributionCalendar></ContributionCalendar> -->
    <!-- <ContributionCalendarRaw /> -->
    <!-- <ContributionCalendarData /> -->
    <!-- <D3Join /> -->
    <ContributionCalendar></ContributionCalendar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ContributionCalendarRaw from '@/components/Github/ContributionCalendar.raw.vue'
import ContributionCalendarData from '@/components/Github/ContributionCalendar.data.vue'
import D3Join from '@/components/Github/D3Join.vue'
import ContributionCalendar from '@/components/Github/ContributionCalendar.vue'
export default Vue.extend({
  components: {
    D3Join,
    // ContributionCalendarRaw,
    // ContributionCalendarData,
    // D3Join,
    ContributionCalendar
  }
})
</script>
<style lang="scss">
body {
  background-color: var(--color-canvas-default);
}
.ContributionCalendar-day {
  fill: var(--color-calendar-graph-day-bg);
  shape-rendering: geometricPrecision;
  outline: 1px solid var(--color-calendar-graph-day-border);
  outline-offset: -1px;
  @for $i from 1 through 4 {
    &[data-level='#{$i}'] {
      fill: var(--color-calendar-graph-day-L#{$i}-bg);
      outline: 1px solid var(--color-calendar-graph-day-L#{$i}-border);
    }
  }
}
.ContributionCalendar-label {
  font-size: 9px;
  fill: var(--color-fg-default);
}
.svg-tip {
  // position: absolute;
  z-index: 99999;
  padding: 8px 16px;
  font-size: 12px;
  color: var(--color-fg-on-emphasis);
  text-align: center;
  background: var(--color-neutral-emphasis-plus);
  border-radius: 6px;
}

.svg-tip-one-line {
  white-space: nowrap;
  pointer-events: none;
}
</style>
