<template>
  <div>
    <div class="mb-8 text-lg text-center relative">
      <div class="absolute left-0 cursor-pointer" @click="prev">
        <el-icon>
          <ArrowLeftBold />
        </el-icon>
      </div>

      验证
    </div>
    <el-form ref="formRef" :model="state" :rules="rules">
      <el-form-item prop="token">
        <el-input v-model="token" placeholder="验证码" />
      </el-form-item>
    </el-form>

    <div class="flex justify-between">
      <count-down-button :onClick="sendOtp"></count-down-button>

      <el-button
        type="primary"
        plain
        :loading="loading"
        @click="handleVerifyEmail"
      >
        提交验证
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StateSymbol } from './constants'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import type { FormInstance, FormItemRule } from 'element-plus'
import { useSwiper } from 'swiper/vue'
const supabase = useSupabaseClient()
const state = inject(StateSymbol)
const formRef = ref<FormInstance>()
const { email, token } = toRefs(state!)
const loading = ref<boolean>(false)
const swiper = useSwiper()
const prev = () => {
  swiper.value.slidePrev()
}

const rules = reactive<Record<string, FormItemRule[]>>({
  token: [
    {
      required: true,
      message: '请输入验证码'
    }
  ]
})

const sendOtp = async () => {
  await supabase.auth.signInWithOtp({
    email: email.value
  })
}
const handleVerifyEmail = async () => {
  try {
    await formRef.value?.validate()
    loading.value = true
    const { data, error } = await supabase.auth.verifyOtp({
      email: email.value,
      token: token.value,
      type: 'magiclink'
    })
    if (error) {
      ElMessage.error(error.message)
    } else {
      ElMessage.success('Login successfully')
      navigateTo('/')
    }
    console.log(data, error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped></style>
