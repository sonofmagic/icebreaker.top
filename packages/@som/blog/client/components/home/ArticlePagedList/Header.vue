<template>
  <div class="bg-blue-50 flex justify-between px-4 py-3 text-sm">
    <div class="flex text-gray-900 items-center">icebreaker的随笔</div>
    <div class="flex text-gray-900 items-baseline">
      <div class="text-xs mr-2"></div>
      <div class="mr-2"></div>
      <div>
        <strong>{{ total }}</strong>
        <span>commits</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticlePagedListHeader',
  props: {
    total: {
      type: [Number, String],
      default: 0,
    },
  },
}
</script>

<style></style>
