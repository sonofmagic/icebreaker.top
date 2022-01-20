<template>
  <div>
    <div ref="boxEl"></div>
    <div
      ref="tooltipEl"
      class="svg-tip svg-tip-one-line"
    >
      <div ref="tooltipContentEl"></div>
      <div
        class="arrow"
        data-popper-arrow
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import * as d3 from 'd3'
import { createPopper } from '@popperjs/core'
import dayjs from 'dayjs'
import { defineComponent, onMounted, ref, onBeforeUnmount } from '@vue/composition-api'

export default defineComponent({
  name: 'ContributionCalendar',

  setup (props, ctx) {
    const now = dayjs()
    const startOfThisYear = now.startOf('y')
    const endOfThisYear = now.endOf('y')
    const dayCount = endOfThisYear.diff(startOfThisYear, 'd') + 1

    const colItemCount = 7

    const boxEl = ref<HTMLDivElement>()
    const tooltipEl = ref<HTMLDivElement>()
    const tooltipContentEl = ref<HTMLDivElement>()
    let svg: d3.Selection<SVGSVGElement, unknown, null, undefined>
    let wrapper: d3.Selection<SVGGElement, unknown, null, undefined>
    const width = Math.floor(dayCount / colItemCount + 1) * 14 + 24
    const height = 112

    type MatrixItem = {
      no: number
      level: number
    }
    const matrix: MatrixItem[][] = []
    const icebreakerMatrix = [
      [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    let colIndex = -1
    for (let i = 0; i < dayCount; i++) {
      const yIdx = i % colItemCount
      if (yIdx === 0) {
        colIndex++
        matrix.push([
          {
            no: i,
            level: icebreakerMatrix[yIdx][colIndex] || 0
          }
        ])
      } else {
        matrix[colIndex].push({
          no: i,
          level: icebreakerMatrix[yIdx][colIndex] || 0
        })
      }
    }
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

    function prerender () {
      if (!svg) {
        svg = d3
          .select(boxEl.value as HTMLDivElement)
          .append('svg')
          .attr('width', width)
          .attr('height', height)
        wrapper = svg.append('g').attr('transform', 'translate(10, 20)')
      }
    }

    function animated (seed = 0) {
      wrapper
        .selectAll<SVGGElement, MatrixItem>('rect')
        .filter((d) => Boolean(d.level))
        .attr('data-level', function (d, i) {
          // console.log(d)
          return (d.level + seed) % 4
        })
    }
    function render (data: MatrixItem[][]) {
      prerender()

      wrapper
        .selectAll('g')
        .data(data)
        .join('g')
        .attr('transform', function (d, i, g) {
          return `translate(${(i + 1) * 14}, 0)`
        })
        .selectAll('rect')
        .data((d) => d)
        .join('rect')
        .text((d) => d.no)
        .attr('width', 10)
        .attr('height', 10)
        .attr('x', 0)
        .attr('y', function (d, i) {
          return i * 13
        })
        .attr('rx', 2)
        .attr('ry', 2)

        .attr('data-count', function (d, i) {
          return d.no
        })
        .attr('data-date', function (d, i) {
          return startOfThisYear.add(d.no, 'd').format('YYYY-MM-DD')
        })
        .classed('ContributionCalendar-day', true)
        .each(function (d, i, g) {
          addPopper(this as SVGRectElement)
        })
        .attr('data-level', function (d, i) {
          return d.level
        })

      function addXAxis () {
        const xAxis = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        for (let idx = 0; idx < xAxis.length; idx++) {
          const label = xAxis[idx]
          wrapper
            .append('text')
            .classed('ContributionCalendar-label', true)
            .attr('y', -7)
            .attr('x', function (d, i) {
              const interval = startOfThisYear.add(idx, 'M').diff(startOfThisYear, 'd')

              const x = Math.floor(interval / 7)
              return (x + 1) * 14
            })
            .text(label)
        }
      }

      function addYAxis () {
        const yAxis = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const day = startOfThisYear.day()

        for (let i = 0; i < yAxis.length; i++) {
          const idx = (i + day) % yAxis.length
          const label = yAxis[idx]
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
    }
    let timer: number
    onMounted(() => {
      let seed = 0
      render(matrix)
      timer = setInterval(() => {
        animated(seed)
        seed++
      }, 150)
      // function step () {
      //   animated(seed)
      //   seed++
      //   window.requestAnimationFrame(step)
      // }
      // window.requestAnimationFrame(step)
    })
    onBeforeUnmount(() => {
      clearInterval(timer)
    })

    return {
      boxEl,
      tooltipEl,
      tooltipContentEl
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
