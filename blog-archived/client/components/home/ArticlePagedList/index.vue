<template>
  <div>
    <div class="border border-gray-300 overflow-auto rounded-md">
      <TableHeader :total="total" />
      <BodySkeleton v-show="listLoading" />
      <TableBody v-show="!listLoading" :articles="articles" />
    </div>
    <PaginationSkeleton
      :class="paginationSkeletonVisible ? 'block' : 'hidden'"
    />
    <div
      :class="paginationSkeletonVisible ? 'hidden' : 'flex'"
      class="justify-center"
    >
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
// #f6f8fa
import PaginationSkeleton from './PaginationSkeleton'
import TableHeader from './Header'
import BodySkeleton from './BodySkeleton'
import TableBody from './Body'
import { getPageList } from '@/api/article'
export default {
  name: 'ArticlePagedList',
  components: {
    TableHeader,
    PaginationSkeleton,
    BodySkeleton,
    TableBody,
  },
  // props: {
  //   init: {
  //     type: [Object],
  //     default: () => {},
  //   },
  // },
  data() {
    return {
      listLoading: true,
      articles: [],
      query: {
        page: 1,
        perPage: 10,
      },
      total: 0,
      paginationSkeletonVisible: true,
    }
  },
  watch: {
    'query.page'() {
      this.getList()
    },
  },
  async mounted() {
    await this.getList()
    this.paginationSkeletonVisible = false
  },
  // created() {
  //   const { query, total, articles } = this.init
  //   Object.assign(this.$data, { query, total, articles })
  // },
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

<style lang="scss" scoped></style>
