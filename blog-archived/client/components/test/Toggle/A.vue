<script>
import { createLifecycleMxin } from '@/mixins/lifecycle'

export default {
  name: 'A',
  mixins: [createLifecycleMxin('A')],
}
</script>

<template>
  <div>A</div>
</template>

<style></style>
