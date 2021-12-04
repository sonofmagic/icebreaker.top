<template>
  <div
    class="
      container
      mx-auto
      flex flex-col
      items-center
      justify-center
      h-screen
      text-4xl
    "
  >
    <div class="font-semibold mb-5">您的微信登录信息</div>
    <div class="w-[750px] break-words">{{ wsTempData }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('cache', {
      wsTempData: 'wsTempData',
    }),
  },
}
</script>

<style></style>
