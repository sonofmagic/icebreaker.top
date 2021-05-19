<template>
  <div class="container mx-auto">
    <input
      v-model.number="value"
      class="border border-solid border-green-400"
    />
    <Before v-for="i in 300" :key="i" :start="value" />
  </div>
</template>

<script>
// 285.8ms 3fps
import Before from '@/components/perf/local-variables/Before'
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

