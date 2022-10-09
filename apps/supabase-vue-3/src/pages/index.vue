<template>
  <Profile v-if="user" />
  <Auth v-else />
</template>

<script setup lang="ts">
const { user } = useUserStoreRefs()
</script>

<style scoped></style>
