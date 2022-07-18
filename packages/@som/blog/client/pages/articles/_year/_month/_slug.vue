<template>
  <div class="container mx-auto" style="max-width: 1280px">
    <div class="flex flex-col py-6 lg:flex-row">
      <div
        ref="leftMenu"
        style="min-width: 142px"
        class="hidden sm:mb-4 sm:inline-block lg:mr-4"
      >
        <!-- <Sticky :offset-top="20" :container="leftMenu"> -->
        <div class="sticky flex sm:block" style="top: 1rem">
          <div class="mb-4">
            <nuxt-link
              class="inline-block w-full rounded-md border border-solid border-border-default bg-canvas-default p-1.5 text-xl font-semibold text-accent-fg hover:bg-canvas-subtle"
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
            class="w-32 truncate py-2"
          >
            <a
              class="hover:text-green-500 cursor-pointer transition-colors duration-200 hover:underline"
              :href="`#${t.id}-f`"
              @click.stop="scrollTo(t.id)"
              >{{ t.text }}</a
            >
          </div>
        </div>

        <!-- </Sticky> -->
      </div>
      <!-- lg: -->
      <div class="content-max-width mb-4 mr-4 w-full p-8 shadow lg:mb-0">
        <div class="mb-4 pb-4">
          <h1 class="mb-2 text-3xl">{{ article.title }}</h1>
          <div
            class="flex flex-col space-y-1 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <tags :tags="tags"></tags>
            </div>

            <div class="flex space-x-4 self-end md:min-w-[240px]">
              <div class="whitespace-no-wrap text-xs">
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
      <div class="w-full flex-grow self-start p-4 shadow sm:w-auto">
        <!-- <Comments /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'

// import Comments from '@/components/common/Comments/dark/DarkParadise.vue'
import { isProd } from '@/utils/env'
import ReadCount from '@/components/common/ReadCount.vue'

export default {
  name: 'ArticlesYearMonthSlug',
  components: {
    // Comments,
    ReadCount,
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
  // default dark mode
  @apply prose prose-sm prose-invert text-fg-default antialiased sm:prose-base; // prose-sm antialiased
  // &.dark {
  //   @apply prose prose-sm prose-invert;
  // }
}
</style>
