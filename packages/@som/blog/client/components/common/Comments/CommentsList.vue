<template>
  <div>
    <div v-loading="listLoading">
      <div
        v-for="comment in comments"
        :key="comment.ts"
        class="border border-gray-300 rounded mb-4 overflow-auto"
      >
        <div
          class="flex items-center justify-between toolbar bg-gray-100 h-8 px-4 text-sm"
        >
          <template v-if="comment.nickName && comment.uid">
            <UserPopover v-model="comment.uid">
              <template #reference>
                <div
                  :class="
                    comment.nickName
                      ? ['cursor-pointer', 'hover:underline']
                      : []
                  "
                >
                  {{ comment.nickName || '*匿名者*' }}
                </div>
              </template>
            </UserPopover>
          </template>
          <template v-else>
            <div
              :class="
                comment.nickName ? ['cursor-pointer', 'hover:underline'] : []
              "
            >
              {{ comment.nickName || '*匿名者*' }}
            </div>
          </template>

          <el-tooltip placement="right" :content="comment.ts | dayFilter">
            <div class="cursor-pointer text-gray-600">
              {{ comment.ts | timespanFilter }}
            </div>
          </el-tooltip>
        </div>
        <div class="px-4 py-2 leading-8">{{ comment.content }}</div>
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
import UserPopover from './UserPopover'
export default {
  name: 'CommentsList',
  components: {
    UserPopover,
  },
  data() {
    return {
      query: {
        page: 1,
        perPage: 10,
      },
      total: 0,
      comments: [],
      listLoading: false,
    }
  },
  watch: {
    'query.page'() {
      this.refresh()
    },
  },
  async created() {
    if (process.client) {
      await this.refresh()
    }
  },
  methods: {
    async refresh() {
      try {
        this.listLoading = true
        const [{ data }, { total }] = await this.$store.dispatch(
          'fetch/getComments',
          {
            id: this.$route.path,
            opt: this.query,
          }
        )
        this.comments = data
        this.total = total
      } catch (error) {
        console.debug(error)
      } finally {
        this.listLoading = false
      }
    },
  },
}
</script>
