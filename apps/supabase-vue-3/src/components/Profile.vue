<template>
  <pre>{{ user }}</pre>
</template>

<script lang="ts" setup>
import { useUserStoreRefs } from '@/store/user'
const { user } = useUserStoreRefs()
</script>
