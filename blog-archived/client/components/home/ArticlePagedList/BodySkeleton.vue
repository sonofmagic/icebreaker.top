<template>
  <div>
    <div
      v-for="i in 10"
      :key="i"
      class="flex text-sm px-4 py-3 border-t border-solid border-gray-300"
    >
      <div class="w-1/6 flex-auto">
        <div class="w-1/2 bg-gray-200 h-3 animate-pulse"></div>
      </div>
      <div class="w-5/12 flex-auto hidden sm:block">
        <div class="w-1/2 bg-gray-200 h-3 animate-pulse"></div>
      </div>
      <div
        class="bg-gray-200 h-3 animate-pulse"
        style="flex-basis: 100px"
      ></div>
    </div>
  </div>
</template>
