<template>
  <div>
    <div v-loading="listLoading" class="border border-gray-300 rounded-md">
      <div class="bg-blue-100 flex justify-between p-4 text-sm">
        <div class="flex text-gray-900 items-center">icebreaker的随笔</div>
        <div class="flex text-gray-900 items-baseline">
          <div class="text-xs mr-2"></div>
          <div class="mr-2"></div>
          <div>
            <strong>{{ total }}</strong>
            <span>commits</span>
          </div>
        </div>
      </div>
      <div
        v-for="article in articles"
        :key="article.path"
        class="flex text-sm px-4 py-2"
      >
        <nuxt-link class="w-1/6 flex-auto flex items-center" :to="article.path">
          <div class="mr-3">
            <FontAwesomeIcon :icon="['far', 'file']" style="color: #6a737d" />
          </div>
          <span
            class="text-gray-800 truncate hover:underline hover:text-blue-600"
            >{{ article.title }}</span
          >
        </nuxt-link>

        <div
          class="w-5/12 hidden flex-auto text-gray-600 cursor-pointer sm:block"
          @click.stop="$router.push(article.path)"
        >
          {{ article.description }}
        </div>
        <div style="flex-basis: 100px" class="text-right text-gray-600">
          {{ article.date | timespanFilter }}
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <el-pagination
        hide-on-single-page
        layout="prev, pager, next"
        :total="total"
        :page-size.sync="query.perPage"
        :current-page.sync="query.page"
        :disabled="listLoading"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getPageList } from '@/api/article'
export default {
  name: 'ArticlePagedList',
  props: {
    init: {
      type: [Object],
      default: () => {},
    },
  },
  data() {
    return {
      listLoading: false,
      articles: [],
      query: {
        page: 1,
        perPage: 10,
      },
      total: 0,
      // paginationDisabled: false,
    }
  },
  watch: {
    'query.page'() {
      this.getList()
    },
  },
  created() {
    const { query, total, articles } = this.init
    Object.assign(this.$data, { query, total, articles })
  },
  methods: {
    async getList() {
      try {
        this.listLoading = true
        const [total, articles] = await getPageList(this.$content, this.query)
        this.total = total
        this.articles = articles
      } catch (error) {
        console.debug(error)
      } finally {
        this.listLoading = false
      }
    },
  },
}
</script>

<style></style>
