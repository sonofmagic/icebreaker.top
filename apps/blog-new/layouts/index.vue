<template>
  <AppLayout>
    <!-- <div class="flex relative">
      <slot name="left"></slot> -->
    <div
      class="relative m-auto max-w-2xl bg-white ring-1 ring-gray-200 dark:bg-primary-800 dark:ring-gray-700 sm:rounded-lg sm:shadow">
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
