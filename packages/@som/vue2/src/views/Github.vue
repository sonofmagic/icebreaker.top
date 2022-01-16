<template>
  <div>
    <ContributionCalendarRaw />
    <ContributionCalendarData />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ContributionCalendarRaw from '@/components/Github/ContributionCalendar.raw.vue'
import ContributionCalendarData from '@/components/Github/ContributionCalendar.data.vue'
export default Vue.extend({
  components: {
    ContributionCalendarRaw,
    ContributionCalendarData
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
</style>
