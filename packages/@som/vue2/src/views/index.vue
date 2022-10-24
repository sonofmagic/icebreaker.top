<template>
  <div class="max-w-[100vw] max-h-[100vh]">
    <!-- <TwoBall></TwoBall> -->
    <div class="flex relative p-16 h-screen">
      <div class="mr-2 flex-shrink-0 w-[200px] overflow-auto">
        <div class=" table border-collapse w-full">
          <div class="h-[48px] border table-row" :key="i" v-for="i in 50">
            <div class="table-cell p-2">

              <el-checkbox></el-checkbox>
              选中第{{i}}行
            </div>
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
