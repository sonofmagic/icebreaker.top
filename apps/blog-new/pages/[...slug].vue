<template>
  <main>
    404 Not Found
    <!-- <NuxtLink to="/">
      <button class="btn">Back to v2 blog</button>
    </NuxtLink> -->

    <!-- <ClientOnly>
      <div class="w-full bg-sky-400 h-4 flex justify-center items-center">
        <NuxtLink to="/" class="text-xs text-center link">
          Click here to visit my new blog
        </NuxtLink>
      </div>

      <WujieVue width="100%" height="100%" name="old-blog" :url="'http://localhost:9000/'" :sync="true" />
    </ClientOnly> -->
  </main>
</template>

<script setup lang="ts">
// import routesV1 from '../routes-v1.json'
// import { createRouterMatcher } from 'vue-router'
// const routesRef = ref(routesV1)
// const router = useRouter()
// const route = useRoute()
// const matcher = createRouterMatcher(routesRef.value, {})
// const s = matcher.resolve(route.path)
// console.log(s)
// router.replace({
//   path: `v1/`
// })
// console.log(route)
// import { bus, setupApp, preloadApp, startApp, destroyApp } from "wujie";
// setupApp({ name: "aaaa", url: "http://localhost:9000/", exec: true, el: "#blog-nuxt2", sync: true })
</script>
