<template>
  <div class="container mx-auto pt-20">
    <div class="flex justify-between">
      <div>
        <el-input v-model="query.title">
          <template #suffix>
            <span class="h-full flex items-center">
              <el-icon
                class="cursor-pointer text-2xl hover:text-blue-500 transition ease-linear duration-150"
                name="search"
                @click.stop.native="getList"
              ></el-icon>
            </span>
          </template>
        </el-input>
      </div>
      <div>
        <el-button type="primary" @click.stop="dialogShow()">Create</el-button>
      </div>
    </div>
    <div>
      <ClientOnly>
        <el-table
          v-loading="$apollo.queries.pagedList.loading"
          :data="pagedList.items"
        >
          <el-table-column label="title" prop="title"></el-table-column>
          <el-table-column label="isbn" prop="isbn"></el-table-column>
          <el-table-column label="pageCount" prop="pageCount"></el-table-column>
          <el-table-column label="publishedDate">
            <template v-slot="{ row }">
              {{ row.publishedDate | dayjs('YYYY-MM-DD') }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button size="mini" type="primary" @click="go2update(row._id)"
                >修改</el-button
              >
              <el-button size="mini" type="danger" @click="go2delete(row._id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page.sync="query.page"
          :total="pagedList.count"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size.sync="query.perPage"
        ></el-pagination>
      </ClientOnly>
    </div>

    <BookDialog
      :source="dialogSource"
      :visible.sync="dialogVisible"
      @refresh="getList"
    />
  </div>
</template>

<script>
import BookDialog from '@/components/gql/BookDialog.vue'
import dayjs from 'dayjs'
import { gqlFindBookList, gqlGetBookById } from '@/gql/query/book'
import { gqlDeleteBook } from '@/gql/mutation/book'
export default {
  name: 'BookList',
  components: {
    BookDialog,
  },
  filters: {
    dayjs(value, format) {
      return dayjs(value).format(format)
    },
  },
  apollo: {
    pagedList: {
      query: gqlFindBookList(),
      variables() {
        return {
          page: this.query.page,
          perPage: this.query.perPage,
          // title: this.query.title,
        }
      },
      // prefetch: true,
    },
  },
  asyncData() {
    return {
      query: {
        title: '',
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
    return {
      dialogVisible: false,
      dialogSource: null,
    }
  },
  created() {},
  methods: {
    dialogShow(source) {
      this.dialogSource = source
      this.dialogVisible = true
    },
    async getList() {
      await this.$apollo.queries.pagedList.refetch()
    },
    async go2update(id) {
      const {
        data: { book },
      } = await this.$apollo.query({
        query: gqlGetBookById(),
        variables: {
          id,
        },
      })
      this.dialogShow(book)
      // console.log(book)
    },
    async go2delete(id) {
      try {
        await this.$confirm('确认删除')
        await this.$apollo.mutate({
          mutation: gqlDeleteBook(),
          variables: {
            id,
          },
        })
        await this.getList()
        this.$message.success('删除成功！')
      } catch (error) {
        console.debug(error)
      }
    },
  },
}
</script>
