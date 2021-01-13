<template>
  <header class="site-header flex items-center px-4 text-white">
    <div class="flex items-center mr-4">
      <router-link class="flex-shrink-0" to="/">
        <img class="rounded-full h-8 w-8" :src="logoUri" />
      </router-link>
    </div>
    <div class="header-middle-area text-left hidden sm:flex flex-grow">
      <HeaderSearchBar />
      <nav class="nav ml-4 hidden lg:block">
        <a
          v-for="item in outSideLinks"
          :key="item.title"
          target="_blank"
          class="link mr-4 cursor-pointer font-semibold whitespace-no-wrap text-sm"
          rel="nofollow"
          :href="item.href"
        >
          <span>{{ item.title }}</span>
        </a>
      </nav>
    </div>
    <client-only>
      <div class="tail flex justify-end flex-grow sm:flex-grow-0">
        <template v-if="isLogined && !isAnony">
          <el-dropdown
            key="drop"
            class="outline-none"
            size="small"
            trigger="click"
          >
            <div class="avatar-wrapper cursor-pointer flex items-center">
              <el-image
                class="rounded-full h-6 w-6 mr-2"
                :src="user.realAvatarUrl || defaultAvatar"
              ></el-image>
              <span v-if="user" class="text-white mr-2">{{
                user.nickName
              }}</span>
              <i class="dropdown-caret"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item style="width: 144px" @click.native="go2Profile"
                >个人中心</el-dropdown-item
              >
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template v-else>
          <button
            key="signinpopover"
            class="btn mr-2"
            @click="SignInVisible = !SignInVisible"
          >
            Sign in
          </button>
          <button
            key="registerpopover"
            class="btn border"
            @click="RegisterVisible = !RegisterVisible"
          >
            Sign up
          </button>
        </template>
      </div>
      <SomPopup
        v-model="SignInVisible"
        title="登录"
        @closed="clearValidate('signin')"
      >
        <SignIn ref="signin" @success="SignInSuccess"></SignIn>
      </SomPopup>
      <SomPopup
        v-model="RegisterVisible"
        title="注册"
        @closed="clearValidate('register')"
      >
        <Register ref="register" @success="RegisterSuccess" />
      </SomPopup>
    </client-only>
  </header>
</template>

<script>
import Logo from '@/assets/img/icon.png'
import Register from '@/components/public/Register/index'
import SignIn from '@/components/public/SignIn/index'
import defaultAvatar from '@/assets/img/default-avatar.png'
import HeaderSearchBar from '@/components/article/HeaderSearchBar'
import { mapGetters } from 'vuex'
import { Dialog } from 'vant'
import SomPopup from '@/components/public/SomPopup'
export default {
  components: {
    Register,
    SignIn,
    HeaderSearchBar,
    SomPopup,
  },
  data() {
    return {
      logoUri: Logo,
      RegisterVisible: false,
      SignInVisible: false,
      outSideLinks: [
        {
          href: 'https://github.com/sonofmagic/sonofmagic.github.io/pulls',
          title: 'Pull requests',
        },
        {
          href: 'https://github.com/sonofmagic/sonofmagic.github.io/issues',
          title: 'Issues',
        },
        // {
        //   href: 'https://github.com/marketplace',
        //   title: 'Marketplace',
        // },
        // {
        //   href: 'https://github.com/explore',
        //   title: 'Explore',
        // },
      ],
      defaultAvatar,
    }
  },
  computed: {
    ...mapGetters('user', ['user', 'isLogined', 'isAnony']),
  },
  methods: {
    clearValidate(refName) {
      this.$refs[refName].clearValidate()
    },
    RegisterSuccess() {
      this.RegisterVisible = false
    },
    SignInSuccess() {
      this.SignInVisible = false
      this.hasLogined = true
    },
    go2Profile() {
      this.$router.push('/profile')
    },
    async logout() {
      try {
        await Dialog.confirm({ message: '确定登出?' })
        // await this.$confirm('确定登出?')
        await this.$store.dispatch('user/signOut')
      } catch {}
    },
  },
}
</script>

<style lang="scss" scoped>
.site-header {
  background-color: #24292e;
  height: 54px;
  .header-middle-area {
    .nav {
      .link {
        &:hover,
        &:focus {
          color: hsla(0, 0%, 100%, 0.7);
        }
      }
    }
  }
  .tail {
    .avatar-wrapper {
      .dropdown-caret {
        display: inline-block;
        width: 0;
        height: 0;
        vertical-align: middle;
        content: '';
        border-top-style: solid;
        border-top-width: 4px;
        border-top-color: #fff;
        border-right: 4px solid transparent;
        border-bottom: 0 solid transparent;
        border-left: 4px solid transparent;
      }
      &:hover {
        .dropdown-caret {
          border-top-color: hsla(0, 0%, 100%, 0.7);
        }
      }
    }

    .btn {
      @apply text-base text-white cursor-pointer leading-6 transition-opacity duration-300 whitespace-no-wrap outline-none px-2 py-1;

      &:hover {
        @apply opacity-75;
      }
      &.border {
        @apply border border-solid border-gray-200 rounded-md;
      }
    }
  }
}
</style>
