<template>
  <div>
    <div
      v-for="article in articles"
      :key="article.path"
      class="flex text-sm px-4 py-2 border-t border-solid border-gray-300 hover:bg-gray-100"
    >
      <div class="w-1/6 flex-auto flex items-center">
        <div class="mr-3">
          <FontAwesomeIcon :icon="['far', 'file']" style="color: #6a737d" />
        </div>
        <nuxt-link
          class="truncate text-gray-800 hover:underline hover:text-blue-600"
          :to="article.path"
        >
          {{ article.title }}
        </nuxt-link>
      </div>

      <div class="w-5/12 hidden flex-auto text-gray-600 sm:block">
        <span
          class="cursor-pointer hover:underline hover:text-blue-600"
          @click.stop="$router.push(article.path)"
        >
          {{ article.description }}</span
        >
      </div>
      <div style="flex-basis: 100px" class="text-right text-gray-600">
        {{ article.date | timespanFilter }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: {
      type: [Array],
      default: () => [],
    },
  },
}
</script>
