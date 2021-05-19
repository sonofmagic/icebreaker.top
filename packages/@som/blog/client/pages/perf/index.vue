<template>
  <div class="container mx-auto">
    <div class="mt-4 flex flex-col space-y-2">
      <nuxt-link
        v-for="route in matchedArr"
        :key="route.name"
        class="text-green-600"
        :to="{ name: route.name }"
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
    const perfRoute = this.$router.options.routes.find((x) => {
      return x.path === '/perf'
    })
    this.matchedArr = perfRoute.children
  },
}
</script>
