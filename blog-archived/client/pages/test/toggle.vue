<template>
  <div>
    <component :is="is"></component>
    <el-button @click="toggle">Toggle</el-button>
    <div v-if="!flag" ref="A" key="A">AAA</div>
    <div v-else ref="B" key="B">BBB</div>
  </div>
</template>

<script>
import A from '@/components/test/Toggle/A.vue'
import B from '@/components/test/Toggle/B.vue'
export default {
  name: 'Toggle',
  components: {
    A,
    B,
  },
  data() {
    return {
      flag: false,
    }
  },
  computed: {
    is({ flag }) {
      return flag ? 'B' : 'A'
    },
  },
  methods: {
    toggle() {
      this.flag = !this.flag
      console.log(this.$refs.A, this.$refs.B)
    },
  },
}
</script>

<style></style>
