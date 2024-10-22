<script>
import { LocalStorageKey } from '@/enum/user'
import { useToggleDark } from 'theme-transition'

// :class="[isDark ? 'text-white' : 'text-white']"
export default {
  data() {
    return {
      // mode: localStorage.getItem(LocalStorageKey.ThemeMode) || 'dark',
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
    mode: {
      get() {
        return this.$store.state.theme
      },
      set(theme) {
        this.$store.commit('set_theme', theme)
      },
    },
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
  created() {
    if (!process.server) {
      const { toggleDark } = useToggleDark({
        getDarkValue: () => {
          return this.isDark
        },
        toggle: this.toggle,
        viewTransition: {
          after: async () => {
            await this.$nextTick()
          },
        },
      })
      this.toggleDark = toggleDark
    }
  },
  methods: {
    setTheme(theme) {
      this.mode = theme
    },
    toggle() {
      if (this.isDark) {
        this.setTheme('light')
      }
      else {
        this.setTheme('dark')
      }
    },
    toggleTheme(event) {
      this.toggleDark(event)
    },
  },
}
</script>

<template>
  <div class="flex items-center text-xl">
    <font-awesome-icon class="cursor-pointer" :icon="icon" @click="toggleTheme" />
  </div>
</template>
