<template functional>
  <div class="cell">
    <div v-if="props.value" class="on" />
    <section v-else class="off" />
  </div>
</template>
