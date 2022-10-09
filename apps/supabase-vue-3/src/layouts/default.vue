<template>
  <div class="flex min-h-screen flex-col">
    <header
      class="sticky top-0 z-40 h-16 border-b border-solid border-slate-900/10 backdrop-blur-sm transition-colors duration-300 dark:border-slate-50/[0.06]"
    >
      <div class="container mx-auto flex h-full items-center justify-between">
        <div
          class="cursor-pointer text-3xl font-thin text-[rgb(0,53,67)] dark:text-white"
        >
          ice breaker
        </div>
        <div class="flex items-center space-x-4">
          <template v-if="user">
            <el-dropdown @command="handleCommand">
              <el-avatar :src="user.user_metadata.avatar_url" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="account">
                    account
                  </el-dropdown-item>
                  <el-dropdown-item command="signout">
                    signout
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <!-- <div class="" @click="navigateTo('/account')">

              </div> -->
          </template>
          <template v-else>
            <el-button type="primary" plain @click="navigateTo('/login')">
              Login / Signup
            </el-button>
            <!-- <el-button type="primary" plain @click="navigateTo('/signup')">
                Signup
              </el-button> -->
          </template>
          <div class="w-6">
            <!-- <font-awesome-icon
              class="cursor-pointer text-2xl text-[rgb(113,113,122)] hover:text-[rgb(63,63,70)] dark:text-[rgb(146,173,173)] dark:hover:text-[rgb(209,226,226)]"
              :icon="icon"
              @click="toggleTheme"
            /> -->
          </div>
        </div>
      </div>
    </header>

    <slot />
  </div>
</template>
<script setup lang="ts">
// import { useUserStoreRefs } from '@/store/user'
// const { user } = useUserStoreRefs()
const supabase = useSupabaseClient()
// const user = useSupabaseUser()
// const colorMode = useColorMode()
// const icon = computed(() => {
//   return colorMode.value === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'
// })

// const toggleTheme = () => {
//   colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
// }

const go2HomePage = async () => {
  await navigateTo('/')
}

// const signOut = async () => {
//   await supabase.auth.signOut()
// }

// const handleCommand = async (command: 'account' | 'signout') => {
//   switch (command) {
//     case 'account': {
//       await navigateTo('/account')
//       break
//     }
//     case 'signout': {
//       await signOut()
//       await navigateTo('/')
//       break
//     }
//   }
// }
</script>
