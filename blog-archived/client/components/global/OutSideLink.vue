<script>
export default {
  name: 'OutSideLink',
  props: {
    raw: {
      type: [Boolean],
      default: false,
    },
    href: {
      type: [String],
      default: '',
    },
    target: {
      type: [String],
      default: '_blank',
    },
    rel: {
      type: [String],
      default: 'nofollow',
    },
  },
}
</script>

<template>
  <a :target="target" :class="raw ? '' : 'link'" :rel="rel" :href="href">
    <slot />
  </a>
</template>
