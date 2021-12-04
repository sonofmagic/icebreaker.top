<template>
  <div>A</div>
</template>

<script>
import { createLifecycleMxin } from '@/mixins/lifecycle'
export default {
  name: 'A',
  mixins: [createLifecycleMxin('A')],
}
</script>

<style></style>
