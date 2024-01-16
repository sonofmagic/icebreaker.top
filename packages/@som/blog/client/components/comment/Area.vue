<template>
  <div>
    <giscus-widget
      repo="sonofmagic/icebreaker.top"
      repoid="MDEwOlJlcG9zaXRvcnkzMjkxNjA0MzM="
      category="Announcements"
      categoryid="MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMzMDMyNzIx"
      mapping="pathname"
      strict="0"
      reactionsenabled="1"
      emitmetadata="0"
      inputposition="bottom"
      :theme="theme"
      lang="zh-CN"
      crossorigin="anonymous"
      loading="lazy"></giscus-widget>
  </div>
</template>

<script>
export default {
  computed: {
    mode() {
      return this.$store.state.theme
    },
    theme({ mode }) {
      return mode === 'light' ? 'light' : 'dark_dimmed'
    },
  },
}
// import { useColorMode } from '@vueuse/core'
// import { computed } from 'vue'
// import { useStore } from '@/store'
// const store = useStore()
// const theme = computed(() => {
//   return store.state.theme
// })

// const colorMode = useColorMode()
// const theme = computed(() => {
//   return colorMode.value === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'
// })
</script>

<style lang="scss" scoped></style>
