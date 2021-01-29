<template>
  <div class="container mx-auto">
    <div class="mt-4 flex flex-col space-y-2">
      <nuxt-link
        v-for="route in matchedArr"
        :key="route.name"
        class="text-green-600"
        :to="route.path"
      >
        {{ route.name }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PerformanceIndex',
  data() {
    return {
      matchedArr: [],
    }
  },
  mounted() {
    this.matchedArr = this.$router.options.routes.filter((x) =>
      x.path.startsWith(this.$route.path + '/')
    )
  },
}
</script>

<style></style>
