<template>
  <div class="application-main flex min-h-screen">
    <aside class="team-left-column w-4/12 px-4 md:px-6 lg:px-8 py-4">
      <DarkSouls></DarkSouls>
    </aside>
    <div class="w-8/12"></div>
  </div>
</template>

<script>
import DarkSouls from '@/components/home/DarkSouls.vue'
export default {
  components: {
    DarkSouls,
  },
  layout: 'noFooter',
}
</script>

<style lang="scss" scoped>
.application-main {
  @apply bg-canvas-inset;
  .team-left-column {
    @apply bg-canvas-default max-w-full;
  }
  @screen md {
    .team-left-column {
      @apply max-w-[350px];
    }
  }
}
</style>
