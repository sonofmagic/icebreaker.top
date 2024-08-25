<script>
export default {
  name: 'SomPopup',
  props: {
    title: {
      type: [String],
      default: '',
    },
    value: {
      type: [Boolean],
      default: false,
    },
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
}
</script>

<template>
  <van-popup
    v-model="visible"
    round
    get-container="body"
    :close-on-click-overlay="false"
    v-bind="$attrs"
    :overlay-style="{
      zIndex: 1024,
    }"
    v-on="$listeners"
  >
    <div class="px-4 pb-4">
      <div class="py-3 mb-2 text-center relative">
        <span class="text-lg"> {{ title }}</span>

        <FontAwesomeIcon
          class="close-btn"
          :icon="['fas', 'times-circle']"
          @click.stop="visible = false"
        />
      </div>
      <slot />
    </div>
  </van-popup>
</template>

<style lang="scss" scoped>
.close-btn {
  color: #c8c9cc;
  font-size: 1.5rem;
  position: absolute;
  right: 0;
  cursor: pointer;
  transition: color 0.3s linear;
  &:hover {
    color: #ee0a24;
  }
}
</style>
