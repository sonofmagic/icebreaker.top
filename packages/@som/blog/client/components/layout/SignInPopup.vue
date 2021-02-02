<template>
  <SomPopup v-model="visible" title="登录" @closed="clearValidate('signin')">
    <SignIn ref="signin" @success="visible = false"></SignIn>
  </SomPopup>
</template>

<script>
import SignIn from '@/components/public/SignIn/index'
export default {
  name: 'SignInPopup',
  components: {
    SignIn,
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
