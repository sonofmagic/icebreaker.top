<script lang="ts" setup>
// const { navigation } = useContent()
const appConfig = useAppConfig()
</script>

<template>
  <div class="mx-auto flex max-w-2xl justify-between px-4 py-4 sm:px-8">
    <!-- Navigation -->
    <div class="text-primary-700 dark:text-primary-200">
      <NuxtLink to="/">
        <TypingEffect />
      </NuxtLink>

      <!-- <NuxtLink
        v-for="link of navigation"
        :key="link._path"
        :to="link._path"
        active-class="font-bold"
        class="mr-6"
      >
        {{ link.title }}
      </NuxtLink> -->
    </div>
    <!-- Social icons & Color Mode -->
    <div class="space-x-3 text-primary-500 transition">
      <a
        v-if="appConfig.socials?.twitter"
        :href="`https://twitter.com/${appConfig.socials?.twitter}`"
        title="Twitter"
        class="hover:text-primary-700 dark:text-primary-100 dark:hover:text-primary-300">
        <Icon name="fa-brands:twitter" class="h-5 w-5" />
      </a>
      <a
        v-if="appConfig.socials?.npm"
        target="_blank"
        :href="`https://www.npmjs.com/~${appConfig.socials?.npm}`"
        title="npm"
        class="hover:text-primary-700 dark:text-primary-100 dark:hover:text-primary-300">
        <Icon name="fa-brands:npm" class="h-5 w-5" />
      </a>
      <a
        v-if="appConfig.socials?.github"
        target="_blank"
        :href="`https://github.com/${appConfig.socials?.github}`"
        title="GitHub"
        class="hover:text-primary-700 dark:text-primary-100 dark:hover:text-primary-300">
        <Icon name="fa-brands:github" class="h-5 w-5" />
      </a>
      <ColorModeSwitch
        class="hover:text-primary-700 dark:text-primary-100 dark:hover:text-primary-300" />
    </div>
  </div>
</template>
