<template>
  <div class="container mx-auto">
    {{ isLogin ? 'Logined' : 'Hello world!' }}
  </div>
</template>

<script setup lang="ts">
const { isLogin } = useUserStoreRefs()
</script>

<style scoped></style>
