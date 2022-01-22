<template>
  <div style="padding-top: 100px; padding-left: 100px">
    <button @click="count--">-</button>
    <button @click="count++">+</button>
    <button @click="start">start</button>
    <button @click="stop">stop</button>
    <ContributionCalendarReactive :count="count"></ContributionCalendarReactive>
    <!-- <ContributionCalendar></ContributionCalendar> -->
    <!-- <ContributionCalendarRaw /> -->
    <!-- <ContributionCalendarData /> -->

    <div style="margin-top: 100px">
      <ContributionCalendar></ContributionCalendar>
    </div>

    <D3Join />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ContributionCalendarRaw from '@/components/Github/ContributionCalendar.raw.vue'
import ContributionCalendarData from '@/components/Github/ContributionCalendar.data.vue'
import ContributionCalendarReactive from '@/components/Github/ContributionCalendar.reactive.vue'
import D3Join from '@/components/Github/D3Join.vue'
import ContributionCalendar from '@/components/Github/ContributionCalendar.vue'
export default Vue.extend({
  data () {
    return {
      count: 15,
      timer: -1
    }
  },
  components: {
    D3Join,
    ContributionCalendarReactive,
    // ContributionCalendarRaw,
    // ContributionCalendarData,
    // D3Join,
    ContributionCalendar
  },
  methods: {
    start () {
      this.timer = setInterval(() => {
        this.count++
      }, 100)
    },
    stop () {
      clearInterval(this.timer)
    }
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
