<template>
  <main>
    <NuxtLink to="/">
      <button class="btn">Back to v2 blog</button>
    </NuxtLink>

    <ClinetOnly>
      <!-- <div id="blog-nuxt2"></div> -->
      <WujieVue width="100%" height="100%" name="xxx" :url="'http://localhost:9000/'" :sync="true"></WujieVue>
    </ClinetOnly>
  </main>
</template>

<script setup lang="ts">
// import { bus, setupApp, preloadApp, startApp, destroyApp } from "wujie";
// setupApp({ name: "aaaa", url: "http://localhost:9000/", exec: true, el: "#blog-nuxt2", sync: true })
</script>
