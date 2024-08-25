<script>
// 76.5ms 13fps
import After from '@/components/perf/reuse-dom-with-v-show/After'

export default {
  components: {
    After,
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
    <After v-for="i in 200" :key="i" :value="value" />
  </div>
</template>
