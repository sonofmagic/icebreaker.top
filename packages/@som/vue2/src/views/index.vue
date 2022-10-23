<template>
  <div class="relative left-[64px] top-[64px]">
    <!-- <TwoBall></TwoBall> -->
    <div class="flex">
      <div class="mr-[50px] w-[200px] table border-collapse">
        <div class="!h-[50px] border table-row" :key="i" v-for="i in 50">
          <div class="table-cell p-2">

            <el-checkbox></el-checkbox>
            选中第{{i}}行
          </div>
        </div>
      </div>
      <Sheet></Sheet>
    </div>

  </div>
</template>

<script lang="ts" setup>

// import TwoBall from '@/components/TwoBalls/index.vue'
import Sheet from '@/components/Sheet/index.vue'

</script>

<style scoped>

</style>
