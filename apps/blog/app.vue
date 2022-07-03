<template>
  <div>
    <!-- <div>
      <h1>Color mode: {{ $colorMode.value }}</h1>
      <select v-model="$colorMode.preference">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="sepia">Sepia</option>
      </select>
    </div> -->
    <ContentDoc class="prose prose-sm" />
    <!-- <NuxtWelcome /> -->
  </div>
</template>
<script setup>
// const colorMode = useColorMode()
</script>
<style lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
