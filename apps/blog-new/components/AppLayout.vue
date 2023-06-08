<script setup lang="ts">
// const { cover } = useAppConfig()
</script>

<template>
  <div>
    <Html lang="en" />
    <Title>
      对酒当歌_人生几何_icebreaker_sonofmagic_人生而自由却无往不在枷锁之中
    </Title>
    <!-- <Meta property="og:image" :content="cover" /> -->
    <Meta name="twitter:card" content="summary_large_image" />
    <AppLoadingBar />
    <AppNavbar />
    <slot />
    <AppFooter />
  </div>
</template>

<style lang="scss">
body {
  @apply min-h-screen bg-primary-50 text-black dark:bg-primary-900 dark:text-white;
}
</style>
