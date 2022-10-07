<template>
  <div class="p-20">
    <RouteNode v-for="(r, i) in routes" :key="r.path" :route="r" />
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useUserStore } from '@/stores/user'
// const { isLoading, isError, data, error } = useQuery(['todos'],$fetch() )
const router = useRouter()
const { user } = useUserStore()
const routes = router.getRoutes()

</script>

<style scoped>

</style>
