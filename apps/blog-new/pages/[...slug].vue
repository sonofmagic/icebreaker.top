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

    <div
      ref="imgRef"
      class="h-[100px] w-[100px] bg-[url('https://xxx.com/xx.jpg')]"
      @error="onError($event, '1')">
      1
    </div>

    <div
      ref="imgRef"
      class="h-[100px] w-[100px] bg-[url('https://xxx.com/xx.jpg'),url('/api/hello?code=where-i-am')]"
      @error="onError($event, '2')">
      2
    </div>
    <button class="btn" @click="count++">add class</button>
  </main>
</template>

<script setup lang="ts">
const imgRef = ref()
const count = ref(0)
function onError(err, name) {
  console.log(err, name)
}

onMounted(() => {
  console.log(imgRef.value)
  const el = imgRef.value as HTMLDivElement
  el.addEventListener('error', function (event) {
    console.log(event)
  })
})
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
