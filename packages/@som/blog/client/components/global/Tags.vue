<template>
  <div class="space-x-2">
    <div
      v-for="tag in tags"
      :key="tag"
      class="inline-block text-accent-fg bg-accent-subtle/20 px-2 text-xs rounded-3xl border border-solid border-transparent cursor-pointer hover:bg-accent-emphasis hover:text-fg-on-emphasis"
    >
      {{ tag }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleTags',
  props: {
    tags: {
      type: [Array],
      default: () => [],
    },
  },
}
</script>

<style lang="scss">
// --color-topic-tag-text: #0366d6;
// --color-topic-tag-bg: #f1f8ff;
// --color-topic-tag-hover-bg: #def;
</style>
