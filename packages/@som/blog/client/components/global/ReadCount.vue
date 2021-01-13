<template>
  <span v-loading="loading" class="text-xs text-gray-900"
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
      console.debug(err)
    } finally {
      this.loading = false
    }
  },
}
</script>

<style></style>
