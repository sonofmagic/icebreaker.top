<template>
  <div class="application-main flex flex-col md:flex-row min-h-screen">
    <aside class="team-left-column flex-shrink-0">
      <div class="sticky-column">
        <div class="hover-scroll-bar sticky-column-inner">
          <DarkSouls></DarkSouls>
        </div>
      </div>
    </aside>
    <div class="flex-auto md:w-8/12 px-4 lg:px-8 order-1 md:order-2">
      <div class="flex flex-col md:flex-row">
        <div class="md:w-full lg:w-8/12 mt-4">
          <h2 class="text-base md:pt-4">All activity</h2>
          <template v-for="(arr, idx) in articlesArray">
            <div :key="idx">
              <DarkArticleCard
                v-for="item in arr"
                :key="item.id"
                :item="item"
              ></DarkArticleCard>
            </div>
          </template>
          <button
            v-if="hasMore"
            class="load-more-btn"
            :disabled="btnLoading"
            @click="next"
          >
            {{ btnText }}
          </button>
          <div class="my-8">
            <SidebarFooter></SidebarFooter>
          </div>
        </div>
        <div class="mt-8 team-right-column md:w-4/12 md:px-6">
          <DarkParadise />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DarkSouls from '@/components/home/DarkSouls.vue'
import { getPageList } from '@/api/article'
import DarkArticleCard from '@/components/article/DarkArticleCard.vue'
import SidebarFooter from '@/components/layout/SidebarFooter'
import DarkParadise from '@/components/common/Comments/dark/DarkParadise.vue'

export default {
  components: {
    DarkSouls,
    DarkArticleCard,
    SidebarFooter,
    DarkParadise,
  },
  layout: 'noFooter',
  async asyncData({ $content }) {
    const query = {
      page: 1,
      perPage: 12,
    }
    const [total, articles] = await getPageList($content, query)
    return {
      articlesArray: [articles],
      query,
      total,
      currentIdx: query.page - 1,
      totalPage: Math.ceil(total / 12),
    }
  },
  data() {
    return {
      btnLoading: false,
    }
  },
  computed: {
    btnText({ btnLoading }) {
      return btnLoading ? 'Loading more...' : 'More'
    },
    hasMore({ total, query }) {
      return total > query.page * query.perPage
    },
  },
  methods: {
    async next() {
      const nextIdx = this.currentIdx + 1
      if (nextIdx < this.totalPage && nextIdx > -1) {
        if (!this.articlesArray[nextIdx]) {
          this.query.page++
          try {
            this.btnLoading = true
            const [total, articles] = await getPageList(
              this.$content,
              this.query
            )
            this.articlesArray.push(articles) // [nextPage - 1] = articles
            this.currentIdx = this.query.page - 1
            this.total = total
          } catch (err) {
            console.error(err)
          } finally {
            this.btnLoading = false
          }
        } else {
          this.currentIdx++
        }
      }
    },
    prev() {
      if (this.currentIdx > 0) {
        this.currentIdx--
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.application-main {
  @apply bg-canvas-inset;
  .team-left-column {
    @apply bg-canvas-default max-w-full md:w-4/12  border-r border-b border-border-muted border-solid order-2 md:order-1;
    .sticky-column {
      // $navbar-height: 62px;
      @apply md:sticky md:top-[62px];
      .sticky-column-inner {
        @apply h-[calc(100vh-62px)] overflow-y-auto px-4 md:px-6 lg:px-8;
      }
    }
  }
  @screen md {
    .team-left-column {
      @apply max-w-[350px];
    }
    .team-right-column {
      @apply max-w-[350px];
    }
  }
}

.load-more-btn {
  @apply text-accent-fg bg-canvas-default border-border-default rounded-md p-1.5 w-full font-semibold mt-5 border border-solid hover:bg-canvas-subtle;
}
</style>
