<template>
  <div>
    <div
      style="color:white"
      ref="box"
    >
      <!-- <button></button> -->
    </div>
    <svg
      ref="svg"
      width="1024"
      height="720"
    ></svg>
  </div>

</template>

<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      items: [
        { name: 'Locke', number: 4 },
        { name: 'Reyes', number: 8 },
        { name: 'Ford', number: 15 },
        { name: 'Jarrah', number: 16 },
        { name: 'Shephard', number: 23 },
        { name: 'Kwon', number: 42 }
      ]
    }
  },
  watch: {
    items () {
      this.render()
    }
  },
  methods: {
    render () {
      d3.select(this.$refs.box)
        .selectAll('div')
        .data(this.items, function (d) {
          return d ? d.name : this.id
        })
        .join(
          (enter) => {
            // debugger
            return enter.append('div')
          },
          (update) => {
            // debugger
            return update
          },
          (exit) => {
            // debugger
            return exit.remove()
          }
        )
        .text((d) => {
          return d.name + ':' + d.number
        })

      const svg = d3.select(this.$refs.svg)

      svg
        .selectAll('circle')
        .data(this.items)
        .join(
          (enter) => {
            // debugger
            return enter.append('circle').attr('fill', 'green')
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
