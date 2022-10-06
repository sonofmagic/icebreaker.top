<template>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <div>
        <el-input v-model="email" type="email" placeholder="Your email" />
      </div>
      <div>
        <el-button type="primary" :loading="loading" @click="handleLogin">
          Send magic link
        </el-button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ElInput, ElButton } from 'element-plus'
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')
const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signIn({ email: email.value })
    if (error) { throw error }
    alert('Check your email for the login link!')
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}
</script>
