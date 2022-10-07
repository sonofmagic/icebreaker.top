<template>
  <div class="flex flex-col min-h-screen">
    <header
      class="sticky top-0 z-40 h-16 border-b border-solid border-slate-900/10 backdrop-blur-sm transition-colors duration-300 dark:border-slate-50/[0.06]"
    >
      <div class="container mx-auto flex h-full items-center justify-between">
        <div class="text-3xl font-thin text-[rgb(0,53,67)] dark:text-white cursor-pointer" @click="go2HomePage">
          ice breaker
        </div>
        <div class="flex space-x-4 items-center">
          <el-button plain>
            Login
          </el-button>
          <el-button type="primary" plain>
            Signup
          </el-button>
          <font-awesome-icon
            class="cursor-pointer text-2xl text-[rgb(113,113,122)] hover:text-[rgb(63,63,70)] dark:text-[rgb(146,173,173)] dark:hover:text-[rgb(209,226,226)]"
            :icon="icon"
            @click="toggleTheme"
          />
        </div>
      </div>
    </header>

    <slot />
  </div>
</template>
<script setup lang="ts">
import { ElButton } from 'element-plus'
const colorMode = useColorMode()
const icon = computed(() => {
  return colorMode.value === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'
})

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const go2HomePage = async () => {
  await navigateTo('/')
}
</script>
