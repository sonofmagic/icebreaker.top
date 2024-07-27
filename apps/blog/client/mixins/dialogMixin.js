const createMixin = (field = 'currentVisible') => {
  /**
   * @type {import("vue/types/options").Component}
   */
  const mixin = {
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      [field]: {
        get() {
          return this.visible
        },
        set(nv) {
          this.$emit('update:visible', nv)
        },
      },
    },
  }
  return mixin
}
export default createMixin()
