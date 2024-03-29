<template>
  <div>
    <div style="color: white">
      <button @click="zoomValueProxy--">-</button>
      {{ zoomValueProxy }}%
      <button @click="zoomValueProxy++">+</button>
    </div>

    <div ref="boxEl"></div>
    <div ref="tooltipEl" class="svg-tip svg-tip-one-line">
      <div ref="tooltipContentEl"></div>
      <div class="arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<script lang="ts">
import * as d3 from 'd3'
import { createPopper } from '@popperjs/core'
import dayjs from 'dayjs'
import { defineComponent, onMounted, ref, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'ContributionCalendar.data',
  setup (props, ctx) {
    const boxEl = ref<HTMLDivElement>()
    const tooltipEl = ref<HTMLDivElement>()
    const tooltipContentEl = ref<HTMLDivElement>()
    let svg: d3.Selection<SVGSVGElement, unknown, null, undefined>

    const width = 722
    const height = 112
    const zoomHandler = d3
      .zoom<SVGSVGElement, unknown>()
      .extent([
        [0, 0],
        [width, height]
      ])
      .scaleExtent([0.1, 8])
    const zoomValue = ref(0)
    const zoomValueProxy = computed({
      get: () => zoomValue.value,
      set: (val) => {
        console.log(val)
        if (val > 0) {
          svg.transition().call(zoomHandler.scaleBy, 1.1)
        } else if (val < 0) {
          svg.transition().call(zoomHandler.scaleBy, 0.9)
        } else {
          // svg.transition().call(zoomHandler.scaleBy, d3.zoomIdentity.k)
          svg
            .transition()
            // .duration(750)
            .call(
              zoomHandler.transform,
              d3.zoomIdentity,
              // @ts-ignore
              d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
            )
        }

        zoomValue.value = val
      }
    })
    function addPopper (targetEl: SVGRectElement) {
      const tooltip = tooltipEl.value as HTMLDivElement
      const tooltipContent = tooltipContentEl.value as HTMLDivElement

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
    onMounted(() => {
      const now = dayjs()
      const colItemCount = 7

      svg = d3
        .select(boxEl.value as HTMLDivElement)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      const wrapper = svg.append('g').attr('transform', 'translate(10, 20)')

      zoomHandler.on('zoom', function (attrs) {
        // console.log(attrs)
        wrapper.attr('transform', attrs.transform)
      })
      svg.call(zoomHandler).on('wheel.zoom', null)

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
          addPopper(this as SVGRectElement)
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
    })

    return {
      boxEl,
      tooltipEl,
      tooltipContentEl,
      zoomValueProxy
    }
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
