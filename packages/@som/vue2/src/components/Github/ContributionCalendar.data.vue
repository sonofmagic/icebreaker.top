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

    const matrix = []
    let colIndex = -1
    for (let i = 0; i < 365; i++) {
      const yIdx = i % colItemCount
      if (yIdx === 0) {
        colIndex++
        matrix.push([i])
      } else {
        matrix[colIndex].push(i)
      }
    }
    wrapper
      .selectAll('g')
      .data(matrix)
      .join('g')
      .attr('transform', function (d, i, g) {
        return `translate(${i * 14}, 0)`
      })
      .selectAll('rect')
      .data((d) => d)
      .join('rect')
      .text((d) => d)
      .attr('width', 10)
      .attr('height', 10)
      .attr('x', 14)
      .attr('y', function (d, i) {
        return i * 13
      })
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('data-level', function (d, i) {
        return i % 4
      })
      .classed('ContributionCalendar-day', true)
  }
})
</script>
