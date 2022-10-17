<template>
  <div>
    <div class="text-lg text-center mb-8">登录/注册</div>
    <el-form ref="formRef" :model="state" :rules="rules">
      <el-form-item prop="email">
        <el-input v-model="email" placeholder="请输入您的邮箱" />
      </el-form-item>
    </el-form>

    <div class="flex justify-between">
      <el-button plain :loading="resetPasswordLoading" @click="resetPassword">
        忘记密码
      </el-button>

      <el-button
        type="primary"
        plain
        :loading="sendEmailLoading"
        @click="handleLogin"
      >
        登录
      </el-button>
    </div>

    <div></div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormItemRule } from 'element-plus'

import { StateSymbol } from './constants'
import { useSwiper } from 'swiper/vue'
const swiper = useSwiper()
const state = inject(StateSymbol)
const supabase = useSupabaseClient()
const formRef = ref<FormInstance>()
const { email } = toRefs(state!)
const rules = reactive<Record<string, FormItemRule[]>>({
  email: [
    {
      required: true,
      message: '请输入你的邮箱'
    },
    {
      type: 'email',
      message: '邮箱格式不正确',
      trigger: 'blur'
    }
  ]
})
const sendEmailLoading = ref(false)
const resetPasswordLoading = ref(false)

const handleLogin = async () => {
  try {
    await formRef.value?.validate()
    sendEmailLoading.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value
    })
    if (error) {
      ElMessage.error(error.message)
      throw error
    }

    ElMessage.success('Check your email for the login link!')
    swiper.value.slideNext()
  } finally {
    sendEmailLoading.value = false
  }
}

const resetPassword = async () => {
  try {
    await formRef.value?.validate()
    resetPasswordLoading.value = true
    await supabase.auth.resetPasswordForEmail(email.value)
    ElMessage.success('Check your email for the reset password!')
  } finally {
    resetPasswordLoading.value = false
  }
}
</script>

<style scoped></style>
