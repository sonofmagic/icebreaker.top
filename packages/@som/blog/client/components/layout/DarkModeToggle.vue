<template>
  <div class="text-xl flex items-center text-white">
    <font-awesome-icon
      class="cursor-pointer"
      :icon="icon"
      @click="toggleTheme"
    />
  </div>
</template>

<script>
import { LocalStorageKey } from '@/enum/user'
// :class="[isDark ? 'text-white' : 'text-white']"
export default {
  data() {
    return {
      mode: localStorage.getItem(LocalStorageKey.ThemeMode) || 'dark',
    }
  },
  head() {
    const htmlAttrs = {}
    if (process.client) {
      htmlAttrs[LocalStorageKey.ThemeMode] = this.mode
    }
    return {
      htmlAttrs,
    }
  },
  computed: {
    isDark({ mode }) {
      return mode === 'dark'
    },
    isLight({ mode }) {
      return mode === 'light'
    },
    icon({ isDark }) {
      return isDark ? ['fas', 'sun'] : ['fas', 'moon']
    },
  },
  methods: {
    setTheme(theme) {
      // document.documentElement.setAttribute(LocalStorageKey.ThemeMode, theme)
      this.mode = theme
      localStorage.setItem(LocalStorageKey.ThemeMode, theme)
    },
    toggleTheme() {
      if (this.isDark) {
        this.setTheme('light')
      } else {
        this.setTheme('dark')
      }
    },
  },
}
</script>

<style></style>
