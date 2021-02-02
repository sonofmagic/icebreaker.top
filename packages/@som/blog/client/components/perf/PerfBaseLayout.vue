<template>
  <div class="container mx-auto">
    <input
      v-model="currentValue"
      class="border border-solid border-green-400"
    />
    <slot v-for="i in renderCount" :$index="i"></slot>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    renderCount: {
      type: [Number],
      default: 300,
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    currentValue: {
      get({ value }) {
        return value
      },
      set(nv) {
        this.$emit('input', nv)
      },
    },
  },
}
</script>

<style></style>
