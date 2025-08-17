<script>
export default {
  data() {
    return {
      mounted: false,
    }
  },
  computed: {
    mode() {
      return this.$store.state.theme
    },
    theme({ mode }) {
      return mode === 'light' ? 'light' : 'dark_dimmed'
    },
  },
  mounted() {
    this.mounted = true
    import('giscus')
  },
}
</script>

<template>
  <div>
    <giscus-widget
      repo="sonofmagic/blog.icebreaker.top"
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
      loading="lazy"
    />
  </div>
</template>

<style lang="scss" scoped></style>
