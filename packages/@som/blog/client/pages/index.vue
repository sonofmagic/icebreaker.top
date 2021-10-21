<template>
  <div class="container mx-auto">
    <div class="flex flex-col py-4 sm:flex-row dark:hidden">
      <div class="flex-shrink-0 w-full px-4 sm:w-3/4">
        <ArticlePagedList />
        <Comments />
      </div>
      <div class="flex-shrink-0 w-full sm:w-1/4">
        <MySelf />
      </div>
    </div>
    <div
      class="
        hidden
        dark:flex dark:justify-between
        min-h-[calc(100vh-54px)]
        py-6
        container
        max-w-[1160px]
        mx-auto
      "
    >
      <div
        class="
          swiper-button-prev
          w-6
          text-xl
          sm:w-20 sm:text-7xl
          hover:animate-pulse hover:bg-white hover:bg-opacity-20
          cursor-pointer
          text-white
          flex
          justify-center
          items-center
        "
        @click="prev"
      >
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="swiper">
        <div class="swiper-wrapper">
          <div
            v-for="(articles, idx) in articlesArray"
            :key="idx"
            :class="idx === currentIdx ? 'grid' : 'hidden'"
            class="swiper-slide grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <nuxt-link
              v-for="item in articles"
              :key="item.path"
              :to="item.path"
              class="
                bg-black
                border border-solid border-accents-200
                rounded-lg
                shadow-sm
                hover:border-white
                transition-colors
              "
            >
              <div class="p-6 space-y-4">
                <div class="text-white font-semibold h-12">
                  {{ item.title }}
                </div>
                <div class="text-accents-600 text-sm truncate h-8">
                  {{ item.description }}
                </div>
                <div class="text-accents-500 text-sm h-5">
                  {{ item.date | timespanFilter }}
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>

      <div
        class="
          swiper-button-next
          w-6
          hover:animate-pulse hover:bg-white hover:bg-opacity-20
          cursor-pointer
          text-white
          sm:w-20 sm:text-7xl
          flex
          justify-center
          items-center
        "
        @click="next"
      >
        <i class="el-icon-arrow-right"></i>
      </div>
      <!-- <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div> -->
    </div>
    <!-- <SitemapIndex :items="hrefs"></SitemapIndex> -->
  </div>
</template>

<script>
// import { getPageList } from '@/api/article'
// import { Swiper, SwiperSlide } from 'swiper'
// import Swiper from 'swiper'
// import 'swiper/css'
// import { Swiper, Navigation, Pagination } from 'swiper/vue'
import ArticlePagedList from '@/components/home/ArticlePagedList'
import Comments from '@/components/common/Comments'
import MySelf from '@/components/home/MySelf'
import { getPageList } from '@/api/article'
import 'swiper/swiper.min.css'
// Swiper.use([Navigation])
// import Swiper JS
// import Swiper styles
// import 'swiper/swiper.scss'
// import 'swiper/swiper-bundle.css'
// import 'swiper/css'
// import SitemapIndex from '@/components/sitemap/index.vue'

export default {
  name: 'Index',
  components: {
    ArticlePagedList,
    MySelf,
    Comments,
    // Swiper,
    // SwiperSlide,
    // SitemapIndex,
  },
  async asyncData({ $content }) {
    const query = {
      page: 1,
      perPage: 12,
    }
    const [total, articles] = await getPageList($content, query)
    // const articles = await $content('articles', {
    //   deep: true,
    // })
    //   .skip((query.page - 1) * query.perPage)
    //   .limit(query.perPage)
    //   .sortBy('date', 'desc')
    //   .only(['path', 'title', 'description', 'date'])
    //   .fetch()
    return {
      articlesArray: [articles],
      query,
      total,
      currentIdx: query.page - 1,
      totalPage: Math.ceil(total / 12),
    }
  },
  mounted() {
    // const swiper = new Swiper('.swiper', {
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
    // })
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
  methods: {
    async next() {
      const nextIdx = this.currentIdx + 1
      if (nextIdx < this.totalPage && nextIdx > -1) {
        if (!this.articlesArray[nextIdx]) {
          this.query.page++
          const [total, articles] = await getPageList(this.$content, this.query)
          this.articlesArray.push(articles) // [nextPage - 1] = articles
          this.currentIdx = this.query.page - 1
          this.total = total
        } else {
          this.currentIdx++
        }
      }
    },
    prev() {
      if (this.currentIdx > 0) {
        this.currentIdx--
      }

      // const nextIdx = this.query.page - 1
      // if (nextIdx < this.totalPage && nextIdx > -1) {
      //   if (!this.articlesArray[nextIdx]) {
      //     this.query.page--
      //     const [total, articles] = await getPageList(this.$content, this.query)
      //     this.articlesArray.push(articles) // [nextPage - 1] = articles
      //     this.currentIdx = this.query.page - 2
      //     this.total = total
      //   }
      // }
    },
  },
}
</script>
