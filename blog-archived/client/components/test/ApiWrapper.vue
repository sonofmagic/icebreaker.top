<template>
  <component is="div">
    <slot :trigger="trigger" :loading="loading" :error="error"></slot>
  </component>
</template>

<script>
export default {
  props: {
    apiFn: {
      type: [Function],
      default: () => () => {},
    },
  },
  data() {
    return {
      loading: false,
      error: null,
    }
  },
  computed: {
    // 第一次闭包
    trigger() {
      return async (...args) => {
        try {
          this.loading = true
          return await this.apiFn(...args)
        } catch (err) {
          this.error = err
        } finally {
          this.loading = false
        }
      }
    },
  },
}
</script>

<style></style>
