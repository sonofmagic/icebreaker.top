<template>
  <div>
    <ContentList
      v-slot="{ list }" path="/articles" :query="{
        sort: {
          id: -1
        },
        where: {
          id: { $exists: true }
        },
        limit: 10,
        without: ['body']
      }"
    >
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
    <button class="btn btn-block mt-4">
      More
    </button>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

function format(v: string) {
  if (!v) {
    return v
  }
  return dayjs(v).local().fromNow()
}
// .utc(v)

</script>

<style scoped></style>
