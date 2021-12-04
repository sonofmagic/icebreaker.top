<template>
  <section class="bg-white dark:bg-accents-100">
    <div v-if="!noHeader">
      <AppHeader />
    </div>
    <slot></slot>
    <div
      v-if="!noFooter"
      class="
        dark:bg-black dark:border-t dark:border-accents-200 dark:border-solid
      "
    >
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
