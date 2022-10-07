<template>
  <div class="container mx-auto">
    <AccountCom v-if="user" />
  </div>
</template>

<script setup lang="ts">
import AccountCom from '@/components/Account.vue'
const user = useSupabaseUser()
</script>

<style scoped>

</style>
