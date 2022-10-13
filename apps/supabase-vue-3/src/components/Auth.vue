<template>
  <div class="flex flex-col items-center space-y-4 rounded border p-8">
    <div>Sign in/up</div>
    <div>
      <el-input v-model="email" placeholder="Your email" />
    </div>
    <div>
      <el-input v-model="captchaToken" placeholder="Your captchaToken" />
    </div>
    <div>
      <el-button type="primary" plain :loading="loading" @click="handleLogin">
        Send magic link / token
      </el-button>
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
    <div>
      <el-button plain :loading="loading" @click="resetPassword">
        Reset password
      </el-button>
    </div>
    <div>OAuth</div>
    <div class="flex space-x-4">
      <font-awesome-icon
        class="cursor-pointer text-4xl text-gray-300 hover:text-gray-900"
        icon="fa-brands fa-github"
        @click="oauthLogin('github')"
      />
      <font-awesome-icon
        class="cursor-pointer text-4xl text-gray-300 hover:text-gray-900"
        icon="fa-brands fa-google"
        @click="oauthLogin('google')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')
const captchaToken = ref('')
const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value
    })
    if (error) {
      ElMessage.error(error.message)
      throw error
    }
    ElMessage.success('Check your email for the login link!')
  } finally {
    loading.value = false
  }
}

const oauthLogin = async (provider: 'github' | 'google') => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider
  })
  console.log(data, error)
}

const resetPassword = async () => {
  await supabase.auth.resetPasswordForEmail(email.value)
  ElMessage.success('Check your email for the reset password!')
}

const handleVerifyEmail = async () => {
  const { data, error } = await supabase.auth.verifyOtp({
    email: email.value,
    token: captchaToken.value,
    type: 'magiclink'
  })
  console.log(data, error)
}
</script>
