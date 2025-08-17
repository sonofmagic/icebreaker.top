<script>
import CommentArea from '@/components/comment/Area.vue'
import { isProd } from '@/utils/env'

export default {
  name: 'ArticlesYearMonthSlug',
  components: {
    // Comments,
    CommentArea,
  },
  layout: 'article',
  async asyncData({ $content, params, error }) {
    const { year, month, slug } = params

    let article

    try {
      article = await $content('articles', year, month, slug).fetch()
    }
    catch {
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
    }
  },
  head() {
    return {
      title: `${this.article.title}_icebreaker`,
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
    href() {
      return `https://icebreaker.top${this.$route.path}`
    },
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
        window.scrollTo({
          top: document.getElementById(id).offsetTop + 81,
          behavior: 'smooth'
        })
      }
    },
  },
}
</script>

<template>
  <div class="container mx-auto max-w-screen-xl">
    <div class="flex flex-col py-6 lg:flex-row">
      <div ref="leftMenu" class="hidden sm:mb-4 sm:inline-block lg:mr-4 lg:grow">
        <div class="sticky top-20 flex sm:block">
          <div class="mb-4">
            <nuxt-link
              class="border-border-default bg-canvas-default text-accent-fg hover:bg-canvas-subtle inline-block w-full rounded-md border border-solid p-1.5 text-xl font-semibold"
              to="/" replace>
              <i class="el-icon-back" />
              回到上一级
            </nuxt-link>
          </div>
          <div v-for="t in toc" :key="t.id" :title="t.text" class="truncate py-2 lg:w-32">
            <a class="cursor-pointer transition-colors duration-200 hover:text-green-500 hover:underline"
              :href="`#${t.id}-f`" @click.prevent="scrollTo(t.id)">
              {{ t.text }}
            </a>
          </div>
        </div>
      </div>

      <div
        class="relative m-auto mb-4 w-full p-4 shadow ring-0 ring-gray-200 sm:max-w-full sm:rounded-lg sm:px-8 sm:shadow sm:ring-1 lg:mb-0 lg:max-w-5xl dark:ring-gray-700">
        <div class="mb-2">
          <h1 class="mb-2 text-3xl">
            {{ article.title }}
          </h1>
          <div class="mb-2 flex flex-col space-y-1 md:flex-row md:items-center md:justify-between">
            <div>
              <tags :tags="tags" />
            </div>

            <div class="flex md:min-w-[240px] md:justify-end">
              <div class="whitespace-no-wrap text-xs">
                共{{ article.readingWords }}个字，阅读时间
                {{ article.readingMinutes }} 分钟
              </div>
            </div>
          </div>
        </div>
        <!-- 不让爬虫爬了，降低风险 -->
        <!-- <ClientOnly> -->
        <nuxt-content class="compose-nuxt-content" :document="article" />
        <div class="text-xs">
          <div>
            版权声明：本文为博主原创文章，遵循
            <a href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener"
              class="text-accent-fg underline">
              CC 4.0 BY-SA
            </a>
            版权协议，转载请附上原文出处链接和本声明。
          </div>
          <div class="article-source-link">
            本文链接：
            <a class="text-accent-fg underline" :href="href" target="_blank">
              {{ href }}
            </a>
          </div>
        </div>
        <!-- END -->
      </div>
    </div>
    <div class="w-full grow self-start p-4 shadow sm:w-auto">
      <CommentArea />
    </div>
  </div>
</template>

<style lang="scss">
.compose-nuxt-content {
  // default dark mode
  @apply prose prose-sm prose-invert max-w-none text-fg-default antialiased sm:prose-base; // prose-sm antialiased
}
</style>
