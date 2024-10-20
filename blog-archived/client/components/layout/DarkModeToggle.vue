<script>
import { LocalStorageKey } from '@/enum/user'
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
      const isAppearanceTransition = typeof document !== 'undefined'
        // @ts-expect-error: Transition API
        && document.startViewTransition
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (!isAppearanceTransition || !event) {
        this.toggle()
        return
      }

      const x = event.clientX
      const y = event.clientY
      const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
      )
      const transition = document.startViewTransition(async () => {
        this.toggle()
        await this.$nextTick()
      })

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ]
        document.documentElement.animate(
          {
            clipPath: this.isDark
              ? [...clipPath].reverse()
              : clipPath,
          },
          {
            duration: 400,
            easing: 'ease-in',
            pseudoElement: this.isDark
              ? '::view-transition-old(root)'
              : '::view-transition-new(root)',
          },
        )
      })
    },
  },
}
</script>

<template>
  <div class="flex items-center text-xl">
    <font-awesome-icon class="cursor-pointer" :icon="icon" @click="toggleTheme" />
  </div>
</template>
