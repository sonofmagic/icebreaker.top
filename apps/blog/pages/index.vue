<template>
  <div class="p-20">
    <RouteNode v-for="(r, i) in routes" :key="r.path" :route="r" />
  </div>
</template>

<script setup lang="ts">

const router = useRouter()

const routes = router.getRoutes()

</script>

<style scoped>
</style>
