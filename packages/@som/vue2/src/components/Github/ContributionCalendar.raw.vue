<template>
  <div ref="box"></div>
</template>

<script lang="ts">
import * as d3 from 'd3'
import Vue from 'vue'

export default Vue.extend({
  mounted () {
    const colItemCount = 7
    const wrapper = d3
      .select(this.$refs.box as HTMLDivElement)
      .append('svg')
      .attr('width', 722)
      .attr('height', 112)
      .append('g')
      .attr('transform', 'translate(10, 20)')

    let colIndex = -1
    let g: d3.Selection<SVGGElement, unknown, null, undefined>
    for (let i = 0; i < 365; i++) {
      const yIdx = i % colItemCount
      if (yIdx === 0) {
        colIndex++
        g = wrapper
          .append('g')
          .attr('transform', `translate(${colIndex * 14}, 0)`)
      }
      g!
        .append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('x', 14)
        .attr('y', yIdx * 13)
        .attr('rx', 2)
        .attr('ry', 2)
        .attr('data-level', i % 4)
        .classed('ContributionCalendar-day', true)
    }

    // Array.from(document.querySelectorAll('.ContributionCalendar-label')).map(x=>x.innerHTML)
    // 'Jan', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'

    function addXAxis () {
      const xAxis = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
      for (let i = 0; i < xAxis.length; i++) {
        const label = xAxis[i]
        wrapper
          .append('text')
          .classed('ContributionCalendar-label', true)
          .attr('y', -7)
          .attr('x', (i * 4 + 1) * 14)
          .text(label)
      }
    }

    function addYAxis () {
      const yAxis = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      for (let i = 0; i < yAxis.length; i++) {
        const label = yAxis[i]
        wrapper
          .append('text')
          .classed('ContributionCalendar-label', true)
          .attr('text-anchor', 'start')
          .attr('x', '-10')
          .attr('y', 8 + i * 13)
          .text(label)
      }
    }
    addXAxis()
    addYAxis()
    // wrapper.append()
  }
})
</script>
