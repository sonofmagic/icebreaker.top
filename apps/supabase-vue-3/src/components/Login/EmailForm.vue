<template>
  <div>
    <div>Sign in/up</div>
    <div>
      <el-input v-model="email" placeholder="Your email" />
    </div>

    <div>
      <el-button
        type="primary"
        plain
        :loading="sendEmailLoading"
        @click="handleLogin"
      >
        Send magic link & token
      </el-button>
    </div>

    <div>
      <el-button plain :loading="resetPasswordLoading" @click="resetPassword">
        Reset password
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IState } from './types'
import { StateSymbol } from './constants'
import isEmail from 'validator/es/lib/isEmail'
const state = inject(StateSymbol)
const supabase = useSupabaseClient()

const { email } = toRefs(state!)

const sendEmailLoading = ref(false)
const resetPasswordLoading = ref(false)

const handleLogin = async () => {
  try {
    sendEmailLoading.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value
    })
    if (error) {
      ElMessage.error(error.message)
      throw error
    }
    ElMessage.success('Check your email for the login link!')
  } finally {
    sendEmailLoading.value = false
  }
}

const resetPassword = async () => {
  try {
    resetPasswordLoading.value = true
    await supabase.auth.resetPasswordForEmail(email.value)
    ElMessage.success('Check your email for the reset password!')
  } finally {
    resetPasswordLoading.value = false
  }
}
</script>

<style scoped></style>
