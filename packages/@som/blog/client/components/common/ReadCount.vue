<template>
  <span class="text-xs text-fg-default whitespace-no-wrap"
    >阅读&nbsp;{{ readCount }}</span
  >
</template>

<script>
export default {
  name: 'ArticleReadCount',
  props: {
    refId: {
      type: [Number, String],
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      readCount: '',
    }
  },
  async mounted() {
    try {
      this.loading = true
      const id = this.refId || this.$route.path
      const readCount = await this.$store.dispatch(
        'fetch/getArticleReadCount',
        {
          id,
        }
      )
      this.readCount = readCount
    } catch (err) {
      console.error(err)
    } finally {
      this.loading = false
    }
  },
}
</script>

<style></style>
