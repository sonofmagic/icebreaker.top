<script>
import { createLifecycleMxin } from '@/mixins/lifecycle'

export default {
  name: 'B',
  mixins: [createLifecycleMxin('B')],
}
</script>

<template>
  <div>B</div>
</template>

<style></style>
