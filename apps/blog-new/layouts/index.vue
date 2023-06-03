<template>
  <AppLayout>
    <!-- <div class="flex relative">
      <slot name="left"></slot> -->
    <div
      class="relative max-w-2xl m-auto bg-white sm:shadow dark:bg-primary-800 ring-1 ring-gray-200 dark:ring-gray-700 sm:rounded-lg">
      <slot name="prepend"></slot>
      <main class="max-w-none">
        <slot />
      </main>
      <slot name="append"></slot>
    </div>
    <!-- <slot name="right"></slot>
    </div> -->
  </AppLayout>
</template>
