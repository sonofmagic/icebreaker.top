<script>
export default {
  name: 'ThemeSwitch',
  data() {
    const refs = {
      darkMode: false,
    }
    if (process.client) {
      if (!localStorage.theme && !localStorage.seted_theme) {
        localStorage.theme = 'light'
        localStorage.seted_theme = 1
      }
      refs.darkMode = localStorage.getItem('theme') === 'dark'
    }
    return refs
  },
  computed: {
    theme: {
      get() {
        return this.darkMode
      },
      set(nv) {
        if (process.client) {
          localStorage.setItem('theme', nv ? 'dark' : 'light')
        }
        this.darkMode = nv
      },
    },
  },
  watch: {
    // very lazy
    darkMode() {
      this.checkMode()
    },
  },
  mounted() {
    this.checkMode()
  },
  methods: {
    checkMode() {
      if (
        localStorage.theme === 'dark'
        || (!('theme' in localStorage)
        && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark')
      }
      else {
        document.documentElement.classList.remove('dark')
      }
    },
  },
}
</script>

<template>
  <span class="flex items-center">
    <span class="text-sm mr-4 font-semibold">Dark Mode</span>
    <el-switch v-model="theme" />
  </span>
</template>

<style></style>
