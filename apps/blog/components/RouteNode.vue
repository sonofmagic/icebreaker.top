<template>
  <div class="border border-dashed">
    <nuxt-link :to="route.path">
      {{ route.path }}
    </nuxt-link>
    <div v-if="route.children.length" class="pl-4">
      <RouteNode v-for="c in route.children" :key="c.path" :route="c" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordNormalized } from 'vue-router'
const props = defineProps<{
  route: RouteRecordNormalized
}>()
const { route } = toRefs(props)
</script>

<style scoped>
</style>
