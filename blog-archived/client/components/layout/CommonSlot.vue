<script>
import AppFooter from '@/components/layout/Footer'
import AppHeader from '@/components/layout/Header'

export default {
  name: 'CommonSlot',
  components: {
    AppHeader,
    AppFooter,
  },
  props: {
    noHeader: {
      type: [Boolean],
      default: false,
    },
    noFooter: {
      type: [Boolean],
      default: false,
    },
  },
}
</script>

<template>
  <section>
    <AppHeader v-if="!noHeader" />

    <slot />

    <AppFooter v-if="!noFooter" />
  </section>
</template>
