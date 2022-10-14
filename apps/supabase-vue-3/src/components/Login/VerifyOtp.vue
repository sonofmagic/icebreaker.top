<template>
  <div>
    <div>
      <el-input v-model="token" :maxlength="6" placeholder="Your token" />
    </div>
    <div>
      <el-button
        type="primary"
        plain
        :loading="loading"
        @click="handleVerifyEmail"
      >
        verify email token
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IState } from './types'
import { StateSymbol } from './constants'
const supabase = useSupabaseClient()
const state = inject(StateSymbol)

const { email, token } = toRefs(state!)
const loading = ref<boolean>(false)
const handleVerifyEmail = async () => {
  try {
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
