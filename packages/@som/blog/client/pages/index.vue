<template>
  <div class="container mx-auto">
    <div class="flex flex-col py-4 sm:flex-row">
      <div class="flex-shrink-0 w-full px-4 sm:w-3/4">
        <ArticlePagedList :init="{ query, total, articles }" />
        <Comments />
      </div>
      <div class="flex-shrink-0 w-full sm:w-1/4">
        <MySelf />
      </div>
    </div>
  </div>
</template>

<script>
import { getPageList } from '@/api/article'
import ArticlePagedList from '@/components/home/ArticlePagedList'
import Comments from '@/components/common/Comments'
import MySelf from '@/components/home/MySelf'
export default {
  name: 'Index',
  components: {
    ArticlePagedList,
    MySelf,
    Comments,
  },
  async asyncData({ $content, error }) {
    try {
      const query = {
        page: 1,
        perPage: 10,
      }
      const [total, articles] = await getPageList($content, query)

      return {
        query,
        articles,
        // recent,
        total,
      }
    } catch (err) {
      console.error(err)
      error({ statusCode: 404, message: err.message })
    }
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
