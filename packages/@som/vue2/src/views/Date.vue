<template>
  <div>
    <el-date-picker :value="value" @input="onInput" :picker-options="pickerOptions" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
    </el-date-picker>
    <div>
      <div>readonly</div>
      <div>{{ readonly }}</div>
    </div>
    <el-button @click="toggleReadonly">toggle</el-button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import dayjs from 'dayjs'
const value = ref([])
const readonly = ref(false)
const isLocked = ref(false)
// const lockDates = ref([])

function toggleReadonly() {
  readonly.value = !readonly.value
}
function onInput(e) {
  if (!isLocked.value) {
    value.value = e
  }
  // console.log(e)
}
const pickerOptions = ref({
  shortcuts: [
    {
      text: '天',
      onClick(picker) {
        const d = dayjs().toDate()
        // value.value = [d, d]
        // console.log(picker)
        picker.$emit('pick', [d, d])
        isLocked.value = true
      }
    },
    {
      text: '周',
      onClick(picker) {
        const d = dayjs()
        const d1 = d.startOf('w').toDate()
        const d2 = d.endOf('w').toDate()
        picker.$emit('pick', [d1, d2])
        isLocked.value = true
      }
    },
    {
      text: '月',
      onClick(picker) {
        const d = dayjs()
        const d1 = d.startOf('M').toDate()
        const d2 = d.endOf('M').toDate()
        picker.$emit('pick', [d1, d2])
        isLocked.value = true
      }
    },
    {
      text: '自定义',
      onClick(picker) {
        isLocked.value = false
      }
    }
  ],
  disabledDate(time) {
    if (isLocked.value) {
      return true
    }
  }
})
</script>

<style scoped></style>
