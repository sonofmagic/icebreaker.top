<template>
  <div class="container mx-auto">
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
              class="inline-block no-underline text-xl bg-green-500 text-white rounded p-2 shadow hover:shadow-md"
              to="/"
            >
              <i class="el-icon-back"></i>
              回到上一级</nuxt-link
            >
          </div>
          <div
            v-for="t in toc"
            :key="t.id"
            :title="t.text"
            class="py-2 truncate w-32"
          >
            <a
              class="cursor-pointer transition-colors duration-200 hover:text-green-500 hover:underline"
              @click.stop="scrollTo(t.id)"
              >{{ t.text }}</a
            >
          </div>
        </div>

        <!-- </Sticky> -->
      </div>
      <!-- lg: -->
      <div
        class="mb-4 lg:mb-0 mr-4 bg-white p-8 shadow w-full content-max-width"
      >
        <div class="border-b border-solid border-gray-300 pb-4 mb-4">
          <h1 class="text-3xl mb-2">{{ article.title }}</h1>
          <div class="flex justify-between items-center">
            <tags :tags="tags"></tags>
            <ReadCount :ref-id="article.id"></ReadCount>
          </div>
        </div>
        <!-- 不让爬虫爬了，降低风险 -->
        <ClientOnly>
          <nuxt-content
            class="antialiased prose prose-sm sm:prose"
            :document="article"
          />
        </ClientOnly>
        <!-- END -->
      </div>
      <div class="flex-grow bg-white shadow p-4">
        <Comments />
      </div>
    </div>
  </div>
</template>

<script>
// import { Sticky, Sidebar, SidebarItem } from 'vant'
import Comments from '@/components/common/Comments'
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
import { gsap } from 'gsap'
export default {
  name: 'ArticlesYearMonthSlug',
  components: {
    Comments,
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
