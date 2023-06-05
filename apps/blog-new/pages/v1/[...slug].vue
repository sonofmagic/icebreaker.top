<template>
  <main>
    <ClientOnly>
      <div class="flex h-4 w-full items-center justify-center bg-sky-400">
        <NuxtLink to="/" class="link text-center text-xs text-white">
          Click here to visit my new blog
        </NuxtLink>
      </div>
      <!-- <div id="blog-nuxt2"></div> -->
      <WujieVue
        width="100%"
        height="100%"
        name="old-blog"
        :url="'http://localhost:9000/'"
        :sync="true" />
    </ClientOnly>
  </main>
</template>

<script setup lang="ts"></script>
