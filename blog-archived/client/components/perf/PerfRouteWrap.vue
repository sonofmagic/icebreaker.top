<script>
export default {
  name: 'PerfRouteWrap',
  props: {
    category: {
      type: [String],
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    links({ category }) {
      return [
        {
          path: `/perf/${category}/before`,
          text: 'before',
        },
        {
          path: `/perf/${category}/after`,
          text: 'after',
        },
      ]
    },
  },
}
</script>

<template>
  <div class="container mx-auto px-4 pb-12">
    <div class="flex">
      <aside class="w-1/4">
        <nav class="flex flex-col pt-8 text-gray-700">
          <nuxt-link to="/perf">
            Go Back
          </nuxt-link>
          <h2 class="pb-2 font-bold uppercase">
            {{ category }}
          </h2>
          <nuxt-link
            v-for="link in links"
            :key="link.path"
            class="p-2 pl-4 rounded transition-colors duration-300 ease-linear hover:text-green-500"
            :class="[
              $route.path === link.path
                ? ['text-green-500', 'bg-green-100']
                : null,
            ]"
            :to="link.path"
          >
            {{ link.text }}
          </nuxt-link>
        </nav>
      </aside>
      <nuxt-child class="w-3/4 px-4 py-8" />
    </div>
  </div>
</template>

<style></style>
