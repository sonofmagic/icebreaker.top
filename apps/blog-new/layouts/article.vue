<template>
  <AppLayout>
    <!-- <div class="flex relative">
      <slot name="left"></slot> -->
    <div
      class="relative max-w-2xl px-4 pt-4 pb-4 m-auto  sm:px-8 sm:shadow bg-white dark:bg-primary-800 ring-1 ring-gray-200 dark:ring-gray-700 sm:rounded-lg"
    >
      <slot name="prepend" />
      <main class="max-w-none">
        <slot />
      </main>
      <slot name="append" />
    </div>
    <!-- <slot name="right"></slot>
    </div> -->
  </AppLayout>
</template>
