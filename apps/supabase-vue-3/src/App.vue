<template>
  <div class="container m-8 border p-8">
    <!-- <Profile v-if="store.user" />
    <Auth v-else /> -->
  </div>
</template>

<script setup lang="ts">
// import { store } from './store/store/store'
// import { supabase } fro./supabase/supabasease'
import Auth from './components/Auth.vue'
import Profile from './components/Profile.vue'

// store.user = supabase.auth.user()
// supabase.auth.onAuthStateChange((_, session) => {
//   store.user = session.user
// })
</script>
