<template>
  <div class="container mx-auto">
    <input v-model="value" class="border border-solid border-green-400" />
    <After v-for="i in 800" :key="i" :value="value" />
  </div>
</template>

<script>
// 102.3ms 10fps
import After from '@/components/perf/functional/After'
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
