<template>
  <div class="flex flex-col items-center">
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
const oauthLogin = async (provider: 'github' | 'google') => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider
  })
  console.log(data, error)
}
</script>

<style scoped></style>
