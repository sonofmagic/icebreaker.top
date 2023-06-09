<template>
  <main>404 Not Found</main>
</template>

<script setup lang="ts">
const imgRef = ref()
const count = ref(0)
function onError(err, name) {
  console.log(err, name)
}

onMounted(() => {
  // console.log(imgRef.value)
  // const el = imgRef.value as HTMLDivElement
  // el.addEventListener('error', function (event) {
  //   console.log(event)
  // })
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
<style lang="scss" scoped>
.xxxx {
  $bg-url: 'https://picx.zhimg.com/80/v2-8423493676f9ccce56d18159e8e26187_1440w.webp';
  $bg-url: 'https://xxxx.com/xxx.jpg';
  width: 200px;
  height: 200px;
  background-image: url('/api/hello?code=where-i-am');

  @supports (background-image: url($bg-url)) {
    background-image: url($bg-url);
  }
}
</style>
