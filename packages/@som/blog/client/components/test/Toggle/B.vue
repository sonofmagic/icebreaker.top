<template>
  <div>B</div>
</template>

<script>
import { createLifecycleMxin } from '@/mixins/lifecycle'
export default {
  name: 'B',
  mixins: [createLifecycleMxin('B')],
}
</script>

<style></style>
