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
      loadingString: '',
    }
  },
  watch: {
    'query.page': function () {
      this.refresh()
    },
    // listLoading(nv) {
    //   let timer
    //   if (nv) {
    //     const setLoadingString = () => {
    //       if (this.loadingString.length > 5) {
    //         this.loadingString = ''
    //       }
    //       this.loadingString += '.'
    //       timer = setTimeout(setLoadingString, 200)
    //     }
    //     timer = setTimeout(setLoadingString, 200)
    //   } else {
    //     clearTimeout(timer)
    //   }
    // },
  },
  async created() {
    if (process.client) {
      await this.refresh()
    }
  },
  methods: {
    setLoadingString() {
      if (this.loadingString.length > 5) {
        this.loadingString = ''
      }
      this.loadingString += '.'
      this.timer = setTimeout(this.setLoadingString, 200)
    },
    clearLoadingString() {
      clearTimeout(this.timer)
    },
    async refresh() {
      try {
        this.listLoading = true
        this.setLoadingString()
        await this.$nextTick()
        const [{ data }, { total }] = await this.$store.dispatch(
          'fetch/getComments',
          {
            id: this.$route.path,
            opt: this.query,
          },
        )
        this.comments = data
        this.total = total
      }
      catch (error) {
        console.debug(error)
      }
      finally {
        this.listLoading = false
        this.clearLoadingString()
      }
    },
  },
}
</script>

<template>
  <div>
    <h2 class="font-semibold text-sm mb-1">
      Explore comments
      <template v-if="listLoading">
        {{ loadingString }}
      </template>
    </h2>
    <div>
      <div
        v-for="comment in comments"
        :key="comment.ts"
        class="py-2 my-2 border-b border-solid border-border-muted"
      >
        <div
          class="flex justify-between items-baseline text-fg-default font-semibold text-sm mb-1"
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
            <div class="cursor-pointer text-fg-muted text-xs font-normal">
              {{ comment.ts | timespanFilter }}
            </div>
          </el-tooltip>
        </div>
        <div class="text-xs mb-2 text-fg-muted">
          {{ comment.content }}
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <el-pagination
        v-model:page-size="query.perPage"
        v-model:current-page="query.page"
        class="dark"
        hide-on-single-page
        layout="prev, pager, next"
        :total="total"
        :disabled="listLoading"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .dark.el-pagination {
  .btn-prev,
  .btn-next {
    @apply bg-canvas-inset text-[#C0C4CC];
    // #C0C4CC
    &[disabled='disabled'] {
      @apply text-[#C0C4CC]/50;
    }
  }

  .el-pager {
    > li.number {
      @apply bg-canvas-inset text-fg-muted;
      &.active {
        @apply text-fg-default;
      }
    }
  }
}
</style>
