<template>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <div>
        <el-input
          class="inputField"
          type="email"
          placeholder="Your email"
          v-model="email"
        />
      </div>
      <div>
        <el-button
          type="submit"
          class="button block"
          :loading="loading"
          :disabled="loading"
          >Send magic link</el-button
        >
      </div>
    </div>
    <div @click="handleOauthLogin">Github</div>
  </form>
</template>

<script lang="ts" setup>
import { supabase } from '@/supabase/index'

const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signIn({ email: email.value })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}

const handleOauthLogin = async () => {
  await supabase.auth.signIn({
    provider: 'github',
  })
}
</script>
