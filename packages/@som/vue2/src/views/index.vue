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
  // const zoomHandler = d3
  //   .zoom<SVGSVGElement, unknown>()
  //   .extent([
  //     [0, 0],
  //     [width, height]
  //   ])
  //   .scaleExtent([0.1, 8])

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
  const wrapper = svg.append('g')
  // zoomHandler.on('zoom', function (attrs) {
  //   // console.log(attrs)
  //   wrapper.attr('transform', attrs.transform)
  // })
  // svg.call(zoomHandler)// .on('wheel.zoom', null)
  const links = wrapper.selectAll('line')
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

  const circles = wrapper.selectAll('circle')
    .data(nodesData)
    .join('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', radius)
    .attr('fill', (d, i) => d3.schemeCategory10[i])
    // @ts-ignore
    .call(drag())

  const moons = wrapper.selectAll('.moon')
    .data(nodesData)
    .join('circle')
    .classed('moon', true)
    .attr('cx', d => d.x)
    .attr('cy', d => d.y - radius - 20)
    .attr('r', 10)
    .attr('fill', (d, i) => d3.schemeCategory10[i])
    .style('transition', 'transform 500ms ease')
    .attr('transform-origin', d => `${d.x}px ${d.y}px`)
  // const path = d3.path();
  // const arc = d3.arc()
  //  Math.PI = 180°
  // const pies = wrapper.selectAll('.pie')
  //   .data(nodesData)
  //   .join('polygon')
  //   .attr('points', d => {
  //     return [
  //       [d.x,d.y]
  //     ]

  //   })
  //   .classed('pie', true)
  //   // .attr('transform-origin', d => `${d.x}px ${d.y}px`)
  //   // .attr('transform', d => `translate(${d.x}, ${d.y - radius - 45})`)
  //   .attr('fill', 'red')
  //   .attr('stroke', 'black')
  //   .attr('stroke-width', 1)

  // Math.sin
  let i = 0
  setInterval(() => {
    moons.attr('transform', d => `rotate(${i * 6})`)
    // pies.attr('transform', d => `translate(${d.x}, ${d.y - radius - 45}),rotate(${i * 6})`)
    i++
  }, 100)
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

      moons.attr('cx', d => d.x)
        .attr('cy', d => d.y - radius - 20).attr('transform-origin', d => `${d.x}px ${d.y}px`)

      // pies.attr('transform', d => `translate(${d.x}, ${d.y - radius - 45})`).attr('transform-origin', d => `${d.x}px ${d.y}px`)
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
