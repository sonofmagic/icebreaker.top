<template>
  <form class="row flex-center flex" @submit.prevent>
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
          @click="handleLogin"
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
    const { error } = await supabase.auth.signInWithOtp({ email: email.value })
    if (error) {
      console.log(error)
    }
  } catch (error) {
  } finally {
    loading.value = false
  }
}

const handleOauthLogin = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'github'
  })
}
</script>
