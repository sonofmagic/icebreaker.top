<template>
  <div class="container mx-auto" style="max-width: 1280px">
    <div class="py-6 flex flex-col lg:flex-row">
      <div
        ref="leftMenu"
        style="min-width: 142px"
        class="hidden sm:inline-block sm:mb-4 lg:mr-4"
      >
        <!-- <Sticky :offset-top="20" :container="leftMenu"> -->
        <div class="flex sm:block sticky" style="top: 1rem">
          <div class="mb-4">
            <nuxt-link
              class="inline-block text-xl text-accent-fg bg-canvas-default border-border-default rounded-md p-1.5 w-full font-semibold border border-solid hover:bg-canvas-subtle"
              to="/"
              replace
            >
              <i class="el-icon-back"></i>
              回到上一级
            </nuxt-link>
          </div>
          <div
            v-for="t in toc"
            :key="t.id"
            :title="t.text"
            class="py-2 truncate w-32"
          >
            <a
              class="cursor-pointer transition-colors duration-200 hover:text-green-500 hover:underline"
              :href="`#${t.id}-f`"
              @click.stop="scrollTo(t.id)"
              >{{ t.text }}</a
            >
          </div>
        </div>

        <!-- </Sticky> -->
      </div>
      <!-- lg: -->
      <div class="mb-4 lg:mb-0 mr-4 p-8 shadow w-full content-max-width">
        <div class="pb-4 mb-4">
          <h1 class="text-3xl mb-2">{{ article.title }}</h1>
          <div
            class="flex flex-col space-y-1 md:flex-row md:justify-between md:items-center"
          >
            <div>
              <tags :tags="tags"></tags>
            </div>

            <div class="flex space-x-4 self-end md:min-w-[240px]">
              <div class="text-xs whitespace-no-wrap">
                共{{ article.readingWords }}个字，阅读时间
                {{ article.readingMinutes }} 分钟
              </div>
              <ReadCount v-if="isProd" :ref-id="article.id"></ReadCount>
            </div>
          </div>
        </div>
        <!-- 不让爬虫爬了，降低风险 -->
        <!-- <ClientOnly> -->
        <nuxt-content class="compose-nuxt-content" :document="article" />
        <!-- </ClientOnly> -->
        <!-- END -->
      </div>
      <div class="flex-grow shadow p-4 self-start w-full sm:w-auto">
        <Comments />
      </div>
    </div>
  </div>
</template>

<script>
// import { Sticky, Sidebar, SidebarItem } from 'vant'
import { gsap } from 'gsap'
import Comments from '@/components/common/Comments/dark/DarkParadise.vue'
import { isProd } from '@/utils/env'
import ReadCount from '@/components/common/ReadCount.vue'
// import ScrollMagic from 'scrollmagic'
// /**
//  * 居然没有官方的@type文件
//  * @type {import('scrollreveal')}
//  */
// let ScrollReveal
// let isSupported
// if (process.client) {
//   // https://scrollrevealjs.org/api/defaults.html
//   // const opt = {}
//   const m = require('scrollreveal').default
//   isSupported = m.isSupported()
//   ScrollReveal = m({ reset: true })
// }
// let ScrollMagic
// if (process.client) {
//   ScrollMagic = require('scrollmagic')
//   console.log(new ScrollMagic.Controller())
// }
export default {
  name: 'ArticlesYearMonthSlug',
  components: {
    Comments,
    ReadCount,
    // Sticky,
    // Sidebar,
    // SidebarItem,
  },
  layout: 'article',
  async asyncData({ $content, params, error }) {
    const { year, month, slug } = params

    let article

    try {
      article = await $content('articles', year, month, slug).fetch()
    } catch (e) {
      error({ message: 'Article not found' })
    }

    return {
      article,
    }
  },
  data() {
    return {
      leftMenu: null,
      isProd,
      // isSupported,
    }
  },
  head() {
    return {
      title: this.article.title + '_icebreaker',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.article.description,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.article.description,
        },
      ],
    }
  },
  computed: {
    toc() {
      return this.article.toc || []
    },
    tags() {
      return this.article.tags || []
    },
  },
  mounted() {
    this.leftMenu = this.$refs.leftMenu
  },
  methods: {
    scrollTo(id) {
      if (id) {
        gsap.to(window, {
          duration: 0.5,
          scrollTo: { y: `#${id}`, offsetY: 16 },
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
//用 @responsive 添加自定义响应式
// @variants 添加伪类

// @responsive {
//   .content-max-width {
//     max-width: 44.5rem;
//   }
// }
//lg:content-max-width
// @responsive直接把类包裹成响应式单位

//@screen相当于 @media(min-width:)的封装
@screen lg {
  .content-max-width {
    max-width: 44.5rem;
  }
}
</style>
<style lang="scss">
.compose-nuxt-content {
  @apply prose prose-invert prose-sm sm:prose-base   antialiased; // prose-sm antialiased
}
</style>
