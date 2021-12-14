<template>
  <div class="container mx-auto flex">
    <div class="w-1/2">
      <div v-for="(v, k) in variables" :key="k">
        '{{ removeColorPrefix(k) }}':withOpacityValue('{{ k }}'),
      </div>
    </div>
    <div class="w-1/2">
      <div v-for="(v, k) in variables" :key="k">
        ${{ removeColorPrefix(k) }}:rgb(var({{ k }}));
      </div>
    </div>
  </div>
</template>

<script>
import variables from '@/assets/scss/export.scss'
export default {
  data() {
    return {
      variables,
    }
  },
  methods: {
    removeColorPrefix(str) {
      return str.substring(8)
    },
  },
}
</script>

<style></style>
