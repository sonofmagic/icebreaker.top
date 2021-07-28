<template>
  <div class="container mx-auto">
    <div class="flex flex-col py-4 sm:flex-row">
      <div class="flex-shrink-0 w-full px-4 sm:w-3/4">
        <ArticlePagedList />
        <Comments />
      </div>
      <div class="flex-shrink-0 w-full sm:w-1/4">
        <MySelf />
      </div>
    </div>
    <!-- <SitemapIndex :items="hrefs"></SitemapIndex> -->
  </div>
</template>

<script>
// import { getPageList } from '@/api/article'
import ArticlePagedList from '@/components/home/ArticlePagedList'
import Comments from '@/components/common/Comments'
import MySelf from '@/components/home/MySelf'
// import SitemapIndex from '@/components/sitemap/index.vue'

export default {
  name: 'Index',
  components: {
    ArticlePagedList,
    MySelf,
    Comments,
    // SitemapIndex,
  },
  // async asyncData() {
  //   // console.log(process.client, process.server, process.static)
  //   if (process.server) {
  //     return {
  //       hrefs: await require('@/utils/getArticle')(),
  //     }
  //   }
  //   return {
  //     hrefs: [],
  //   }
  // },
  methods: {},
}
</script>
