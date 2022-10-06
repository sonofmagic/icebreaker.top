<template>
  <div>
    <header
      class="sticky top-0 z-40 h-16 border-b border-solid border-slate-900/10 backdrop-blur-sm transition-colors duration-300 dark:border-slate-50/[0.06]"
    >
      <div class="container mx-auto flex h-full items-center justify-between">
        <div class="text-3xl font-thin text-[rgb(0,53,67)] dark:text-white">
          ice breaker
        </div>
        <font-awesome-icon
          class="cursor-pointer text-2xl text-[rgb(113,113,122)] hover:text-[rgb(63,63,70)] dark:text-[rgb(146,173,173)] dark:hover:text-[rgb(209,226,226)]"
          :icon="icon"
          @click="toggleTheme"
        />
      </div>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>
<script setup lang="ts">
const colorMode = useColorMode()
const icon = computed(() => {
  return colorMode.value === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'
})

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
