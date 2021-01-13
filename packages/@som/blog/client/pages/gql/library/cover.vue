<template>
  <div class="container mx-auto">
    <div class="pt-10">
      <el-table :data="pagedList.items">
        <el-table-column label="book_id" prop="book_id"></el-table-column>
        <el-table-column
          label="ratingcount"
          prop="ratingcount"
        ></el-table-column>
        <el-table-column label="ratingval" prop="ratingval"></el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="query.page"
        :total="pagedList.count"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size.sync="query.perPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { gqlFindCoverList } from '@/gql/query/cover'
export default {
  name: 'CoverList',
  apollo: {
    pagedList: {
      query: gqlFindCoverList(),
      variables() {
        return {
          page: this.query.page,
          perPage: this.query.perPage,
        }
      },
      // prefetch: true,
    },
  },
  asyncData() {
    return {
      query: {
        page: 1,
        perPage: 10,
      },
      pagedList: {
        items: [],
        count: 0,
      },
    }
  },
  data() {
    return {}
  },
  created() {
    // console.log(this.$apollo.queries.pagedList)
  },
  methods: {
    // getList(){
    // }
  },
}
</script>
