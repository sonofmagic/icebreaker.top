<template>
  <NuxtLayout name="article">
    <template #prepend>
      <div class="absolute left-[-7rem] top-0 bottom-0">
        <div class="sticky top-4 space-y-4">
          <button @click="changeDate(d)" :key="d" v-for="d in dates" class="block btn"
            :class="activeDate === d ? 'btn-primary' : undefined">{{ d
            }}</button>
        </div>
      </div>
    </template>
    <div>
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
import { groupBy } from 'lodash-es'
// import type { QueryBuilderParams } from '@nuxt/content'

definePageMeta({
  layout: false,
  // keepalive: true
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

const activeDate = useState(()=>{
  return dates.value[0]
})
// const activeDate = ref(dates.value[0])

const currentArticles = computed(() => {
  return groupedArticles.value[activeDate.value]
})

function changeDate(v: string) {
  activeDate.value = v
}


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

<style scoped></style>
