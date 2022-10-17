<template>
  <el-button :loading="loading" :disabled="btnDisabled" @click="onBtnClick">
    <slot :current="current" :pause="pause" :reset="reset" :start="start">{{
      text
    }}</slot>
  </el-button>
</template>

<script setup lang="ts">
import { useCountDown } from '@vant/use'
// UseCountDownOptions
// import type { ButtonProps } from 'element-plus'
const props = withDefaults(
  defineProps<{
    immediate?: boolean
    millisecond?: boolean
    time?: number
    // loading?: boolean
    onClick?: () =>
      | Promise<boolean | undefined | void>
      | boolean
      | undefined
      | void
  }>(),
  {
    immediate: false,
    millisecond: false,
    time: 60 * 1000
    // loading: false
  }
)

const emit = defineEmits(['click', 'change', 'finish'])

const btnDisabled = ref<boolean>(false)
const loading = ref<boolean>(false)
const countDown = useCountDown({
  time: props.time,
  onChange: (current) => {
    emit('change', current)
  },
  onFinish: () => {
    btnDisabled.value = false
    emit('finish')
  }
})
const startCount = () => {
  btnDisabled.value = true
  countDown.start()
}
const onBtnClick = async () => {
  try {
    loading.value = true
    const valid = await props?.onClick?.()
    if (valid) {
      startCount()
      emit('click')
    }
  } finally {
    loading.value = false
  }
}

const { current, pause, reset, start } = toRefs(countDown)

const text = computed(() => {
  if (current.value.seconds === 0) {
    return '再次发送'
  } else {
    return `${current.value.seconds}后再次发送`
  }
})

onMounted(() => {
  if (props.immediate) {
    startCount()
  }
})
</script>

<style scoped></style>
