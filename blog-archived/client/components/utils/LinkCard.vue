<template>
  <OutSideLink
    v-if="outSide"
    class="rounded-md border border-border-default"
    raw
    :href="to"
  >
    <div class="px-4 py-4 shadow">
      <div class="mb-3 text-2xl font-thin text-accent-fg hover:underline">
        {{ title }}
      </div>
      <div class="text-sm text-fg-muted">{{ desc }}</div>
    </div>
  </OutSideLink>

  <nuxt-link v-else :to="to" class="rounded-md border border-border-default"
    ><div class="px-4 py-4 shadow">
      <div class="mb-3 text-2xl font-thin text-accent-fg hover:underline">
        {{ title }}
      </div>
      <div class="text-sm text-fg-muted">{{ desc }}</div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'LinkCard',
  props: {
    to: {
      type: [String, Object],
      default: '',
    },
    title: {
      type: [String],
      default: '',
    },
    desc: {
      type: [String],
      default: '',
    },
    outSide: {
      type: [Boolean],
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped></style>
