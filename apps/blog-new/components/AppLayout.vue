<script setup lang="ts">
// const { cover } = useAppConfig()
</script>

<template>
  <div>
    <Html lang="en" />
    <!-- <Meta property="og:image" :content="cover" /> -->
    <Meta name="twitter:card" content="summary_large_image" />
    <AppLoadingBar />
    <AppNavbar />
    <slot />
  </div>
</template>

<style lang="scss">
body {
  @apply bg-primary-50 text-black dark:bg-primary-900 dark:text-white min-h-screen;
}
</style>
