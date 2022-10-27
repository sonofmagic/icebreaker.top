<template>
  <div class="max-w-[100vw] max-h-[100vh]">
    <!-- <TwoBall></TwoBall> -->
    <div class="flex relative p-16 h-screen">
      <div class="mr-2 flex-shrink-0 w-[200px] flex flex-col">
        <div class="text-lg p-2 h-[48px] flex-shrink-0">阿斯蒂芬</div>
        <div class="flex-1 overflow-y-hidden" ref="dom">
          <div class="table border-collapse w-full">
            <div class="table-row-group">
              <div class="h-[48px] border table-row" :key="i" v-for="i in 50">
                <div class="table-cell p-2">
                  <el-checkbox></el-checkbox>
                  选中第{{ i }}行
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Sheet @scroll="syncScroll"></Sheet>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import TwoBall from '@/components/TwoBalls/index.vue'
import { ref } from 'vue-demi'
import Sheet from '@/components/Sheet/index.vue'
import type { IScrollOffset } from './types'
const dom = ref<HTMLDivElement>()
const syncScroll = ({ scrollLeft, scrollTop }: IScrollOffset) => {
  if (dom.value) {
    dom.value.scrollLeft = scrollLeft
    dom.value.scrollTop = scrollTop
  }
}
</script>

<style scoped></style>
