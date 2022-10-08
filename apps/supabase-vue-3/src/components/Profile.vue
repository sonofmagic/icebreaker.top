<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <div>
      <label for="email">Email</label>
      <input id="email" type="text" :value="store.user.email" disabled />
    </div>
    <div>
      <label for="username">Name</label>
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <label for="website">Website</label>
      <input id="website" type="website" v-model="website" />
    </div>

    <div>
      <input
        type="submit"
        class="button primary block"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>

    <div>
      <button class="button block" @click="signOut" :disabled="loading">
        Sign Out
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
// import { supabase } fro../supabase/supabasese'
// import { useUserStore } from '@/store/user'

// const loading = ref(true)
// const username = ref('')
// const website = ref('')
// const avatar_url = ref('')

// async function getProfile() {
//   try {
//     loading.value = true
//     store.user = supabase.auth.user()

//     const { data, error, status } = await supabase
//       .from('profiles')
//       .select(`username, website, avatar_url`)
//       .eq('id', store.user.id)
//       .single()

//     if (error && status !== 406) throw error

//     if (data) {
//       username.value = data.username
//       website.value = data.website
//       avatar_url.value = data.avatar_url
//     }
//   } catch (error) {
//     alert(error.message)
//   } finally {
//     loading.value = false
//   }
// }

// async function updateProfile() {
//   try {
//     loading.value = true
//     store.user = supabase.auth.user()

//     const updates = {
//       id: store.user.id,
//       username: username.value,
//       website: website.value,
//       avatar_url: avatar_url.value,
//       updated_at: new Date(),
//     }

//     const { error } = await supabase.from('profiles').upsert(updates, {
//       returning: 'minimal', // Don't return the value after inserting
//     })

//     if (error) throw error
//   } catch (error) {
//     alert(error.message)
//   } finally {
//     loading.value = false
//   }
// }

// async function signOut() {
//   try {
//     loading.value = true
//     const { error } = await supabase.auth.signOut()
//     if (error) throw error
//   } catch (error) {
//     alert(error.message)
//   } finally {
//     loading.value = false
//   }
// }

// onMounted(() => {
//   getProfile()
// })
</script>
