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
  </div>
</template>

<script>
// import { getPageList } from '@/api/article'
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
  // mounted() {
  //   new Promise((resolve, reject) => {
  //     resolve('icebreaker')

  //     console.log('after icebreaker')
  //   }).then((res) => {
  //     console.log('hi i am ' + res)
  //   })
  // },
  // in case of memory leak
  // async asyncData({ $content, error }) {
  //   try {
  //     if (process.client) {
  //       const query = {
  //         page: 1,
  //         perPage: 10,
  //       }
  //       const [total, articles] = await getPageList($content, query)

  //       return {
  //         query,
  //         articles,
  //         // recent,
  //         total,
  //       }
  //     }
  //   } catch (err) {
  //     console.error(err)
  //     error({ statusCode: 404, message: err.message })
  //   }
  // },
  // data() {
  //   return {
  //     query: {
  //       page: 1,
  //       perPage: 10,
  //     },
  //     articles: [],
  //     total: 0,
  //   }
  // },
  // async mounted() {
  //   const [total, articles] = await getPageList(this.$content, this.query)
  //   this.total = total
  //   this.articles = articles
  // },
  methods: {
    // async getList() {
    //   try {
    //     this.listLoading = true
    //     const [total, articles] = await getPageList(this.$content, this.query)
    //     this.total = total
    //     this.articles = articles
    //   } catch (error) {
    //     console.debug(error)
    //   } finally {
    //     this.listLoading = false
    //   }
    // },
  },
}
</script>
