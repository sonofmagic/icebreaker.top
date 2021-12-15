<template>
  <div class="application-main flex flex-col md:flex-row min-h-screen">
    <aside
      class="team-left-column md:w-4/12 px-4 md:px-6 lg:px-8 py-4 border-r border-b border-border-muted border-solid"
    >
      <DarkSouls></DarkSouls>
    </aside>
    <div class="flex-auto md:w-8/12 px-4 lg:px-8">
      <div class="md:flex">
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
            class="text-accent-fg bg-canvas-default border-border-default rounded-md p-1.5 w-full font-semibold mt-5 border border-solid hover:bg-canvas-subtle"
            :disabled="btnLoading"
            @click="next"
          >
            {{ btnText }}
          </button>
          <div class="my-8">
            <SidebarFooter></SidebarFooter>
          </div>
        </div>
        <div class="mt-8 team-right-column md:w-3/12 lg:w-4/12"></div>
      </div>
    </div>
  </div>
</template>

<script>
import DarkSouls from '@/components/home/DarkSouls.vue'
import { getPageList } from '@/api/article'
import DarkArticleCard from '@/components/article/DarkArticleCard.vue'
import SidebarFooter from '@/components/layout/SidebarFooter'
export default {
  components: {
    DarkSouls,
    DarkArticleCard,
    SidebarFooter,
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
    @apply bg-canvas-default max-w-full;
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
</style>
