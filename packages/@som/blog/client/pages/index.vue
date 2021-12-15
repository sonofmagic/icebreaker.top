<template>
  <div class="application-main flex min-h-screen">
    <aside class="team-left-column w-4/12"></aside>
    <div class="w-8/12"></div>
  </div>
</template>

<script>
export default {
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
