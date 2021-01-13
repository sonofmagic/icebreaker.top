<template>
  <SomPopup v-model="visible" title="注册" @closed="clearValidate('register')">
    <Register ref="register" @success="visible = false" />
  </SomPopup>
</template>

<script>
import SomPopup from '@/components/public/SomPopup'
import Register from '@/components/public/Register'
export default {
  name: 'RegisterPopup',
  components: {
    SomPopup,
    Register,
  },
  props: {
    value: {
      type: [Boolean],
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    visible: {
      get() {
        return this.value
      },
      set(nv) {
        this.$emit('input', nv)
      },
    },
  },
  methods: {
    clearValidate(refName) {
      this.$refs[refName].clearValidate()
    },
  },
}
</script>
