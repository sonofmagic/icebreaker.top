<template>
  <section>
    <div v-if="!noHeader">
      <AppHeader />
    </div>
    <slot></slot>
    <div v-if="!noFooter">
      <AppFooter />
    </div>
  </section>
</template>
<script>
import AppHeader from '@/components/layout/Header'
import AppFooter from '@/components/layout/Footer'

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
