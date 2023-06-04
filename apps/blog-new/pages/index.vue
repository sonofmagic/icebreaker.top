<template>
  <NuxtLayout name="index">
    <template #prepend>
      <div class="absolute left-[-7rem] top-0 bottom-0">

        <div class="flex relative h-full" ref="scrollRef">
          <div class="space-y-4 pr-4">
            <button @click="changeDate(d)" :key="d" v-for="d in dates" class="block btn"
              :class="activeDate === d ? 'btn-primary' : undefined">{{ d
              }}</button>
          </div>

        </div>


      </div>
    </template>
    <div class="h-[calc(100vh-108px)] relative px-4 py-8" ref="scrollContentRef">
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
            <div class="text-base text-gray-400 mb-2">
              {{ article.description }}
            </div>
            <div class="flex justify-between items-center">
              <div class="space-x-1.5">
                <span v-for="tag in article.tags " :key="tag" class="badge badge-primary badge-outline">
                  {{ tag }}</span>
              </div>
              <div class="text-xs text-white">
                {{ format(article.date) }}
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
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
// import type { QueryBuilderParams } from '@nuxt/content'

definePageMeta({
  layout: false,
})
const { data: groupedArticles } = await useAsyncData('all-articles', async () => {
  const articles = await queryContent('articles').sort({
    id: -1
  }).where({
    id: { $exists: true }
  }).without(['body']).find()

  return groupBy(articles, (x) => {
    return dayjs(x.date).format('YYYY/MM')
  })
})

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
const scrollRef = ref<Element>()
const scrollContentRef = ref<Element>()
const scrollYState = useState('scrollYState', () => {
  return 0
})
const onDebounceScroll = debounce(() => {
  scrollYState.value = scrollRef.value!.scrollTop
}, 200)
function onPsScroll(e: Event) {
  onDebounceScroll()
}
let ps = ref<PerfectScrollbar>()
onMounted(() => {
  if (scrollRef.value) {
    ps.value = new PerfectScrollbar(scrollRef.value)
    ps.value.element.addEventListener('scroll', onPsScroll, {
      passive: true
    })
    if (scrollYState.value > -1) {
      ps.value.element.scrollTop = scrollYState.value
    }

  }

  if (scrollContentRef.value) {
    new PerfectScrollbar(scrollContentRef.value, {
      suppressScrollX: true
    })
  }
})

onBeforeUnmount(() => {
  if (ps.value) {
    ps.value.element.removeEventListener('scroll', onPsScroll, {})
    ps.value.destroy()
    ps.value = undefined
  }
})


// function loadMore() {
//   pagedParams.limit += perPage
// }
// const query = computed(() => {
//   return {
//     sort: {
//       id: -1
//     },
//     where: {
//       id: { $exists: true }
//     },
//     skip: 0,
//     limit: pagedParams.limit,
//     without: ['body']
//   }
// })


function format(v: string) {
  if (!v) {
    return v
  }
  return dayjs(v).local().fromNow()
}
// .utc(v)

</script>

<style lang="scss">
.ps .ps__rail-x:hover,
.ps .ps__rail-y:hover,
.ps .ps__rail-x:focus,
.ps .ps__rail-y:focus,
.ps .ps__rail-x.ps--clicking,
.ps .ps__rail-y.ps--clicking {
  background-color: transparent;
  opacity: 0.9;
}
</style>
