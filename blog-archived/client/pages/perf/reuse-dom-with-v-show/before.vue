<script>
// 133.9ms 7fps
import Before from '@/components/perf/reuse-dom-with-v-show/Before'

export default {
  components: {
    Before,
  },
  data() {
    return {
      value: '',
    }
  },
}
</script>

<template>
  <div class="container mx-auto">
    <input v-model="value" class="border border-solid border-green-400">
    <Before v-for="i in 200" :key="i" :value="value" />
  </div>
</template>
