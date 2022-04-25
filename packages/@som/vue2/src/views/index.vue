<template>
  <div ref="dom" class="p-4">

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as d3 from 'd3'
import type { BaseType } from 'd3'
const height = 600
const width = 1024
const radius = 32

function chart () {
  const nodesData = Array.from({ length: 2 }, () => ({
    x: Math.random() * (width - radius * 2) + radius,
    y: Math.random() * (height - radius * 2) + radius
  }))
  const linksData = [{ source: 0, target: 1 }]
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width, height])
    .style('border', '1px solid black')
    .attr('width', width)
    .attr('height', height)
    .attr('stroke-width', 2)

  const links = svg.selectAll('line')
    .data(linksData.map(x => {
      return {
        source: nodesData[x.source],
        target: nodesData[x.target]
      }
    }))
    .join('line')
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y)
    .attr('stroke', 'black')

  const circles = svg.selectAll('circle')
    .data(nodesData)
    .join('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', radius)
    .attr('fill', (d, i) => d3.schemeCategory10[i % 10])
    .call(drag())

  function drag () {
    // 限制在这块区域内
    const xMin = 0 + radius
    const xMax = width - radius
    const yMin = 0 + radius
    const yMax = height - radius
    function dragstarted (this: Element) {
      d3.select(this).raise().attr('stroke', 'black')
    }

    function dragged (this: Element, event: DragEvent, d: any) {
      d3.select(this)
        .attr('cx', function () {
          if (event.x < xMin) {
            d.x = xMin
          } else if (event.x > xMax) {
            d.x = xMax
          } else {
            d.x = event.x
          }
          return d.x
        })
        .attr('cy', function () {
          if (event.y < yMin) {
            d.y = yMin
          } else if (event.y > yMax) {
            d.y = yMax
          } else {
            d.y = event.y
          }
          return d.y
        })
      links.attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
    }

    function dragended (this: Element) {
      d3.select(this).attr('stroke', null)
    }

    return d3.drag<Element, unknown>()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended)
  }

  return svg.node()
}

export default Vue.extend({
  mounted () {
    // @ts-ignore
    this.$refs.dom.appendChild(chart())
  }
})
</script>

<style scoped>
</style>
