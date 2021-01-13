<template>
  <div class="bg-black w-screen h-screen"></div>
</template>

<script>
import { Snows } from '@/lib/snow'
export default {
  name: 'SnowIndex',
  data() {
    return {}
  },
  mounted() {
    this.snows = new Snows({
      isRain: true,
      num: 300,
      maxSpeed: 15,
    })
  },
}
</script>
