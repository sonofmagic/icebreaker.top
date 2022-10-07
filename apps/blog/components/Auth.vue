<template>
  <client-only>
    <div class="flex flex-col items-center space-y-4 border p-8 rounded">
      <div>Sign in/up</div>
      <div>
        <el-input v-model="email" placeholder="Your email" />
      </div>
      <div>
        <el-button type="primary" plain :loading="loading" @click="handleLogin">
          Send magic link
        </el-button>
      </div>
      <div>
        <el-button plain :loading="loading" @click="resetPassword">
          Reset password
        </el-button>
      </div>
      <div>OAuth</div>
      <div class="flex space-x-4">
        <font-awesome-icon
          class="text-4xl cursor-pointer text-gray-300 hover:text-gray-900"
          icon="fa-brands fa-github"
          @click="oauthLogin('github')"
        />
        <font-awesome-icon
          class="text-4xl cursor-pointer text-gray-300 hover:text-gray-900"
          icon="fa-brands fa-google"
          @click="oauthLogin('google')"
        />
      </div>
    </div>
  </client-only>
</template>

<script setup lang="ts">
import { ElInput, ElButton, ElMessage } from 'element-plus'
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')
const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signIn({ email: email.value })
    if (error) { throw error }
    ElMessage.success('Check your email for the login link!')
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}

const oauthLogin = async (provider: 'github' | 'google') => {
  const { user, session, error } = await supabase.auth.signIn({
    provider
  })
  console.log(user, session, error)
}

const resetPassword = async () => {
  await supabase.auth.api.resetPasswordForEmail(email.value)
  ElMessage.success('Check your email for the reset password!')
}
</script>
