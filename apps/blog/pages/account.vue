<template>
  <div>
    <Account v-if="user" />
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
</script>

<style scoped>

</style>
