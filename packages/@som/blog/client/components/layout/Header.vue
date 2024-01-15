<template>
  <header class="site-header">
    <div class="mr-4 flex items-center">
      <router-link class="flex-shrink-0" to="/">
        <img class="h-8 w-8 rounded-full" :src="logoUri" />
      </router-link>
    </div>
    <div class="header-middle-area hidden flex-grow text-left sm:flex">
      <HeaderSearchBar />
      <nav class="nav ml-4 hidden lg:flex lg:items-center">
        <nuxt-link
          v-for="inlink in inSideLinks"
          :key="inlink.key"
          class="link"
          :to="inlink.to">
          {{ inlink.title }}
        </nuxt-link>
        <a
          v-for="item in outSideLinks"
          :key="item.title"
          target="_blank"
          class="link"
          rel="nofollow"
          :href="item.href">
          <span>{{ item.title }}</span>
        </a>
        <!-- <span>
          <ThemeSwitch></ThemeSwitch>
        </span> -->
      </nav>
    </div>

    <client-only>
      <div class="tail flex flex-grow justify-end sm:flex-grow-0">
        <DarkModeToggle class="mr-2"></DarkModeToggle>
        <!-- <template v-if="isRealLogined">
          <el-dropdown
            key="drop"
            class="outline-none"
            size="small"
            trigger="click"
          >
            <div class="avatar-wrapper flex cursor-pointer items-center">
              <el-image
                class="mr-2 h-6 w-6 rounded-full"
                :src="user.realAvatarUrl || defaultAvatar"
              ></el-image>
              <span v-if="user" class="mr-2 text-white">{{
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
            class="nav-btn mr-2"
            @click="SignInVisible = !SignInVisible"
          >
            Sign in
          </button>
          <button
            key="registerpopover"
            class="nav-btn round-border"
            @click="RegisterVisible = !RegisterVisible"
          >
            Sign up
          </button>
        </template> -->
      </div>
      <!-- <SignInPopup v-model="SignInVisible"></SignInPopup>
      <RegisterPopup v-model="RegisterVisible"></RegisterPopup> -->
    </client-only>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { Dialog } from 'vant'
// import SignInPopup from './SignInPopup'
// import RegisterPopup from './RegisterPopup'
import DarkModeToggle from './DarkModeToggle.vue'
import HeaderSearchBar from '@/components/article/HeaderSearchBar'
import defaultAvatar from '@/assets/img/default-avatar.png'
import Logo from '@/assets/img/avatar.jpg'
// import ThemeSwitch from '@/components/theme/ThemeSwitch.vue'
export default {
  components: {
    HeaderSearchBar,
    // SignInPopup,
    // RegisterPopup,
    DarkModeToggle,
    // ThemeSwitch,
  },
  data() {
    return {
      logoUri: Logo,
      RegisterVisible: false,
      SignInVisible: false,

      outSideLinks: [
        // {
        //   href: 'https://cloudbase.icebreaker.top',
        //   title: 'SimpleCloudbase',
        // },
        // {
        //   href: 'https://github.com/sonofmagic/icebreaker.top/pulls',
        //   title: 'Pull requests',
        // },
        // {
        //   href: 'https://github.com/sonofmagic/icebreaker.top/issues',
        //   title: 'Issues',
        // },
        {
          href: 'https://weapp-tw.icebreaker.top/',
          title: 'Weapp-tw',
        },
        {
          href: 'https://ui.icebreaker.top/zh-CN',
          title: 'IceStack',
        },
        {
          href: 'https://www.npmjs.com/~icebreaker',
          title: 'Packages',
        },
        // {
        //   href: 'https://blog.icebreaker.top/',
        //   title: 'Blog-v2 (Beta)',
        // },
        // {
        //   href: 'https://rendertron.icebreaker.top/',
        //   title: 'Rendertron',
        // },
        // {
        //   href: 'https://www.shareplus.cn/',
        //   title: 'Shareplus',
        // },
        // {
        //   href: 'https://github.com/marketplace',
        //   title: 'Marketplace',
        // },
        // {
        //   href: 'https://github.com/explore',
        //   title: 'Explore',
        // },
      ],
      inSideLinks: [
        {
          key: 100,
          to: '/utils',
          title: 'Utils',
        },
        {
          key: 200,
          to: '/chart',
          title: 'Charts',
        },
        {
          key: 300,
          to: '/demos',
          title: 'Demos',
        },
        {
          key: 400,
          to: '/mp',
          title: 'My Mps',
        },
      ],
      defaultAvatar,
    }
  },
  computed: {
    ...mapGetters('user', ['user', 'isRealLogined']),
  },
  methods: {
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
  height: 64px;
  @apply sticky top-0 z-50 flex items-center bg-header-bg px-4 py-4 text-sm text-header-text/70 md:px-6 lg:px-8;

  .header-middle-area {
    .nav {
      .link {
        //https://tailwindcss.com/docs/upgrading-to-v2#update-renamed-utility-classes
        @apply mr-4 cursor-pointer whitespace-nowrap font-semibold text-header-logo;

        &:hover,
        &:focus {
          @apply text-header-text/70;
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

    .nav-btn {
      @apply cursor-pointer whitespace-nowrap px-2 py-1 text-base leading-6 text-white outline-none transition-opacity duration-300;

      &:hover {
        @apply opacity-75;
      }

      &.round-border {
        @apply overflow-auto rounded-md border border-solid border-gray-200;
      }
    }
  }
}
</style>
