<template>
  <main>
    <ClientOnly>
      <div class="w-full bg-sky-400 h-4 flex justify-center items-center">
        <NuxtLink to="/" class="text-xs text-center link text-white">
          Click here to visit my new blog
        </NuxtLink>
      </div>
      <!-- <div id="blog-nuxt2"></div> -->
      <WujieVue width="100%" height="100%" name="old-blog" :url="'http://localhost:9000/'" :sync="true" />
    </ClientOnly>
  </main>
</template>

<script setup lang="ts">

</script>
