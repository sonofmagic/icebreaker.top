<template>
  <div>
    <div ref="box"></div>
    <div ref="tooltip" class="svg-tip svg-tip-one-line">
      <div ref="tooltipContent"></div>
      <div class="arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<script lang="ts">
import * as d3 from 'd3'
import Vue from 'vue'
import { createPopper } from '@popperjs/core'
import dayjs from 'dayjs'

export default Vue.extend({
  methods: {
    addPopper (targetEl: SVGRectElement) {
      const tooltip = this.$refs.tooltip as HTMLDivElement
      const tooltipContent = this.$refs.tooltipContent as HTMLDivElement
      // const targetEl = this.$refs.box as HTMLDivElement
      const popperInstance = createPopper(targetEl, tooltip, {
        placement: 'top'
      })

      function show () {
        tooltip.setAttribute('data-visible', '')
        const count = targetEl.getAttribute('data-count')
        const date = targetEl.getAttribute('data-date')
        tooltipContent.innerHTML = `<strong>${count} contributions</strong> on ${date}`
        // We need to tell Popper to update the tooltip position
        // after we show the tooltip, otherwise it will be incorrect
        popperInstance.update()
      }

      function hide () {
        tooltip.removeAttribute('data-visible')
      }

      const showEvents = ['mouseenter', 'focus']
      const hideEvents = ['mouseleave', 'blur']

      showEvents.forEach((event) => {
        targetEl.addEventListener(event, show)
      })

      hideEvents.forEach((event) => {
        targetEl.addEventListener(event, hide)
      })

      return popperInstance
    }
  },
  mounted () {
    const width = 722
    const height = 112

    const now = dayjs()
    const vm = this
    const colItemCount = 7

    const svg = d3
      .select(this.$refs.box as HTMLDivElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
    const wrapper = svg.append('g').attr('transform', 'translate(10, 20)')

    const zoomHandler = d3
      .zoom<SVGSVGElement, unknown>()
      .extent([
        [0, 0],
        [width, height]
      ])
      .scaleExtent([1, 8])
      .on('zoom', function (attrs) {
        console.log(attrs)
        wrapper.attr('transform', attrs.transform)
      })
    svg.call(zoomHandler)

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
      .attr('data-count', function (d, i) {
        return i
      })
      .attr('data-date', function (d, i) {
        return now.add(i, 'd').format('YYYY-MM-DD')
      })
      .classed('ContributionCalendar-day', true)
      .each(function (d, i, g) {
        vm.addPopper(this as SVGRectElement)
      })

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

    // https://popper.js.org/docs/v2/tutorial/#functionality
    // const state = await popperInstance.update()
  }
})
</script>
<style lang="scss">
.svg-tip[data-popper-placement^='top'] > .arrow {
  bottom: -4px;
}

.svg-tip[data-popper-placement^='bottom'] > .arrow {
  top: -4px;
}

.svg-tip[data-popper-placement^='left'] > .arrow {
  right: -4px;
}

.svg-tip[data-popper-placement^='right'] > .arrow {
  left: -4px;
}
.svg-tip {
  display: none;
  &[data-visible] {
    display: block;
  }
  .arrow {
    visibility: hidden;

    &,
    &::before {
      position: absolute;
      width: 8px;
      height: 8px;
      background: inherit;
    }

    &::before {
      visibility: visible;
      content: '';
      transform: rotate(45deg);
    }
  }
}
</style>
