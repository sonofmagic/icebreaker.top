<template>
  <div class="container mx-auto">
    <input v-model="value" class="border border-solid border-green-400" />
    <Before v-for="i in 800" :key="i" :value="value" />
  </div>
</template>

<script>
// 232.7ms 4fps
import Before from '@/components/perf/functional/Before'
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

