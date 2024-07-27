<template functional>
  <div class="cell">
    <div v-if="props.value" class="on">
      <Heavy :start="10000" />
    </div>
    <section v-else class="off">
      <Heavy :start="10000" />
    </section>
  </div>
</template>
