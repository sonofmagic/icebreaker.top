<template>
  <div>
    <!-- <nav>
      <ContentNavigation v-slot="{ navigation }" :query="query">
        <ul>
          <li v-for="link of navigation" :key="link._path">
            <NuxtLink :to="link._path">
              {{ link.title }}
            </NuxtLink>
          </li>
        </ul>
      </ContentNavigation>
    </nav> -->
    <ContentList v-slot="{ list }" path="/articles" :query="query">
      <div class="space-y-8">
        <BaseCard v-for="article in list" :key="article._path">
          <div class="relative">
            <NuxtLink :to="article._path">
              <h2 class="pb-2 text-2xl font-medium text-white">
                {{ article.title }}
              </h2>
            </NuxtLink>

            <!-- <h3>{{ article.id }}</h3> -->
            <div class="text-base text-gray-400">
              {{ article.description }}
            </div>
            <div class="flex justify-between items-center">
              <div class="space-x-1.5">
                <span v-for="tag in article.tags " :key="tag" class="badge badge-info badge-outline">
                  {{ tag }}</span>
              </div>
              <div class="text-xs text-white">
                {{ format(article.date) }}
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </ContentList>
    <button class="btn btn-block mt-4" @click="loadMore">
      More
    </button>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { reactive, computed } from 'vue'
// import type { QueryBuilderParams } from '@nuxt/content'
const perPage =5
const pagedParams = reactive({
  limit: perPage
})

function loadMore() {
  pagedParams.limit += perPage
}
const query = computed(() => {
  return {
    sort: {
      id: -1
    },
    where: {
      id: { $exists: true }
    },
    skip: 0,
    limit: pagedParams.limit,
    without: ['body']
  }
})
function format(v: string) {
  if (!v) {
    return v
  }
  return dayjs(v).local().fromNow()
}
// .utc(v)

</script>

<style scoped></style>
