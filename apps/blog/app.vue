<template>
  <main>
    <div>
      <h1 class="dark:text-white">Color mode: {{ $colorMode.value }}</h1>
      <select v-model="$colorMode.preference">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
    <ContentDoc class="prose prose-sm dark:prose-invert" />
  </main>
</template>
<script setup></script>
<style lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

body {
  @apply dark:bg-black;
}
</style>
