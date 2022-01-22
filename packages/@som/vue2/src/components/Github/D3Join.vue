<template>
  <div>
    <div>
      <button @click="shift">shift</button>
      <button @click="push">push</button>
    </div>
    <div style="color: white" ref="box">
      <!-- <button></button> -->
    </div>

    <svg ref="svg" width="1024" height="720"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import { v4 } from 'uuid'
export default {
  data () {
    return {
      items: []
    }
  },
  watch: {
    items () {
      this.render()
    }
  },
  methods: {
    shift () {
      this.items.shift()
    },
    push () {
      this.items.push({
        name: v4(),
        number: this.items.length
      })
    },
    render () {
      d3.select(this.$refs.box)
        .selectAll('div')
        .data(this.items, function (d) {
          return d ? d.name : this.id
        })
        .join(
          (enter) => {
            // debugger
            return enter.append('div').text((d) => {
              return d.name
            })
          },
          (update) => {
            // debugger
            return update.style('color', 'yellow')
          },
          (exit) => {
            // debugger
            return exit.remove()
          }
        )

      const svg = d3.select(this.$refs.svg)

      svg
        .selectAll('circle')
        .data(this.items)
        .join(
          (enter) => {
            // debugger
            return enter.append('circle').attr('fill', 'green').text(d => d.name)
          },
          (update) => {
            // debugger
            return update.attr('fill', 'blue')
          },
          (exit) => {
            // debugger
            return exit.remove()
          }
        )
        .attr('stroke', 'black')
        .attr('cx', (d, i) => (i + 1) * 50)
        .attr('cy', 50)
        .attr('r', 50)
    }
  },
  mounted () {
    this.render()
  }
}
</script>

<style>
</style>
