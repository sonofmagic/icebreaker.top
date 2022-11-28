<template>
  <span class="whitespace-no-wrap text-xs text-fg-default"
    >阅读&nbsp;{{ readCount }}</span
  >
</template>

<script>
import { incReadCountById } from '@/api/article'
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
      const { data } = await incReadCountById(id)
      this.readCount = data.readcount
    } catch (err) {
      console.error(err)
    } finally {
      this.loading = false
    }
  },
}
</script>

<style></style>
