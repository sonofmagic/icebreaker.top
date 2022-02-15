<template>
  <div>{{ text }}</div>
</template>

<script >
import { stringify } from 'javascript-stringify'
export default {
  props: {
    options: {
      type: [Object],
      default: () => ({})
    }
  },
  data () {
    return {
      options2: this.options
    }
  },
  computed: {
    text ({ options }) {
      return stringify(options)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
