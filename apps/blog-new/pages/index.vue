<template>
  <NuxtLayout name="index">
    <template #prepend>
      <div class="absolute bottom-0 left-[-7rem] top-0 hidden lg:block">
        <div
          :ref="registerPcScrollRef"
          class="relative flex h-full overflow-hidden">
          <div class="space-y-4 pr-4">
            <button
              v-for="d in dates"
              :key="d"
              class="btn block w-24"
              :class="activeDate === d ? 'btn-primary' : undefined"
              @click="changeDate(d)">
              {{ d }}
            </button>
          </div>
        </div>
      </div>
    </template>
    <!-- <div class="relative block lg:hidden ">
      <div :ref="registerMScrollRef" class="flex overflow-hidden px-2 py-2 space-x-2 w-[200px]">
        <button v-for="d in dates" :key="d" class="btn-sm btn inline-block"
          :class="activeDate === d ? 'btn-primary' : undefined" @click="changeDate(d)">
          {{ d }}
        </button>
      </div>
    </div> -->
    <div
      :ref="registerScrollContentRef"
      class="relative overflow-hidden px-4 py-4 lg:h-[calc(100vh-108px)] lg:py-8">
      <!-- <ContentList v-slot="{ list }" path="/articles" :query="query"> -->
      <div class="space-y-8">
        <BaseCard v-for="article in currentArticles" :key="article._path">
          <div class="relative">
            <NuxtLink :to="article._path">
              <h2 class="pb-2 text-2xl font-medium">
                {{ article.title }}
              </h2>
            </NuxtLink>

            <!-- <h3>{{ article.id }}</h3> -->
            <div class="mb-2 text-base text-gray-400">
              {{ article.description }}
            </div>
            <div class="flex items-center justify-between">
              <div class="">
                <span
                  v-for="tag in article.tags"
                  :key="tag"
                  class="badge badge-primary badge-outline mr-1.5">
                  {{ tag }}
                </span>
              </div>
              <div class="flex-shrink-0 text-xs text-white">
                {{ fromNowFilter(article.date) }}
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
      <!-- </ContentList> -->
      <!-- <button class="btn btn-block mt-4" @click="loadMore">
        More
      </button> -->
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { groupBy, debounce } from 'lodash-es'

definePageMeta({
  layout: false
})
const { data: groupedArticles } = await useAsyncData(
  'all-articles',
  async () => {
    const articles = await queryContent('articles')
      .sort({
        id: -1
      })
      .where({
        id: { $exists: true }
      })
      .without(['body'])
      .find()

    return groupBy(articles, (x) => {
      return dayjs(x.date).format('YYYY/MM')
    })
  }
)

const dates = computed(() => {
  return Object.keys(groupedArticles.value)
})

const activeDate = useState(() => {
  return dates.value[0]
})
// const activeDate = ref(dates.value[0])

const currentArticles = computed(() => {
  return groupedArticles.value[activeDate.value]
})

function changeDate(v: string) {
  activeDate.value = v
}

const scrollYState = useState('scrollYState', () => {
  return 0
})

const scrollXState = useState('scrollXState', () => {
  return 0
})

const { registerRef: registerScrollContentRef } = usePerfectScrollbar({
  suppressScrollX: true
})
const {
  registerRef: registerPcScrollRef,
  scrollbarRef: pcScrollbarRef,
  elRef: pcElRef
} = usePerfectScrollbar({
  suppressScrollX: true
})
const {
  registerRef: registerMScrollRef,
  scrollbarRef: mScrollbarRef,
  elRef: mElRef
} = usePerfectScrollbar({
  suppressScrollY: true
})
const onPcDebounceScroll = debounce(() => {
  scrollYState.value = pcElRef.value!.scrollTop
}, 200)

const onMDebounceScroll = debounce(() => {
  scrollXState.value = mElRef.value!.scrollLeft
}, 200)
function onPsScroll(e: Event) {
  onPcDebounceScroll()
}

function onMScroll(e: Event) {
  onMDebounceScroll()
}

onMounted(() => {
  if (pcElRef.value && pcScrollbarRef.value) {
    pcScrollbarRef.value.element.addEventListener('scroll', onPsScroll, {
      passive: true
    })
    if (scrollYState.value > -1) {
      pcScrollbarRef.value.element.scrollTop = scrollYState.value
    }
  }

  if (mElRef.value && mScrollbarRef.value) {
    mScrollbarRef.value.element.addEventListener('scroll', onMScroll, {
      passive: true
    })
    if (scrollXState.value > -1) {
      mScrollbarRef.value.element.scrollLeft = scrollXState.value
    }

    // mScrollbarRef.value.update()
  }
})

onBeforeUnmount(() => {
  if (pcScrollbarRef.value) {
    pcScrollbarRef.value.element.removeEventListener('scroll', onPsScroll, {})
  }
  if (mScrollbarRef.value) {
    mScrollbarRef.value.element.removeEventListener('scroll', onMScroll, {})
  }
})
</script>

<style lang="scss"></style>
