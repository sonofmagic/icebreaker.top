<template>
  <div class="container mx-auto flex">
    <div class="w-1/2">
      <div v-for="(v, k) in variables" :key="k">
        '{{ removeColorPrefix(k) }}':{{ jsFilterShadow(k) }},
      </div>
    </div>
    <div class="w-1/2">
      <div v-for="(v, k) in variables" :key="k">
        ${{ removeColorPrefix(k) }}:{{ scssFilterShadow(k) }};
      </div>
    </div>
  </div>
</template>

<script>
import variables from '@/assets/scss/export.scss'
import copyTextMixin from '@/mixins/copyTextMixin'
export default {
  mixins: [copyTextMixin],
  data() {
    return {
      variables,
    }
  },

  methods: {
    removeColorPrefix(str) {
      // if (str.includes('shadow')) {
      //   return str
      // }
      return str.substring(8)
    },
    jsFilterShadow(str) {
      if (str.includes('shadow')) {
        return `'${str}'`
      }
      return `withOpacityValue('${str}')`
    },
    scssFilterShadow(str) {
      if (str.includes('shadow')) {
        return `var(${str})`
      }
      return `rgb(var(${str}))`
    },
  },
}
</script>

<style></style>
