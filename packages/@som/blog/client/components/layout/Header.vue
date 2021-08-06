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
        <nuxt-link
          v-for="inlink in inSideLinks"
          :key="inlink.key"
          class="link"
          :to="inlink.to"
          >{{ inlink.title }}</nuxt-link
        >
        <a
          v-for="item in outSideLinks"
          :key="item.title"
          target="_blank"
          class="link"
          rel="nofollow"
          :href="item.href"
        >
          <span>{{ item.title }}</span>
        </a>
      </nav>
    </div>
    <client-only>
      <div class="tail flex justify-end flex-grow sm:flex-grow-0">
        <template v-if="isRealLogined">
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
            class="btn round-border"
            @click="RegisterVisible = !RegisterVisible"
          >
            Sign up
          </button>
        </template>
      </div>
      <SignInPopup v-model="SignInVisible"></SignInPopup>
      <RegisterPopup v-model="RegisterVisible"></RegisterPopup>
    </client-only>
  </header>
</template>

<script>
import Logo from '@/assets/img/avatar.jpg'
import defaultAvatar from '@/assets/img/default-avatar.png'
import HeaderSearchBar from '@/components/article/HeaderSearchBar'
import { mapGetters } from 'vuex'
import { Dialog } from 'vant'
import SignInPopup from './SignInPopup'
import RegisterPopup from './RegisterPopup'
export default {
  components: {
    HeaderSearchBar,
    SignInPopup,
    RegisterPopup,
  },
  data() {
    return {
      logoUri: Logo,
      RegisterVisible: false,
      SignInVisible: false,
      outSideLinks: [
        {
          href: 'https://github.com/sonofmagic/icebreaker.top/pulls',
          title: 'Pull requests',
        },
        {
          href: 'https://github.com/sonofmagic/icebreaker.top/issues',
          title: 'Issues',
        },
        {
          href: 'https://www.npmjs.com/~icebreaker',
          title: 'Packages',
        },
        {
          href: 'https://shahu-1257725330.file.myqcloud.com',
          title: 'Shahu',
        },
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
  background-color: #24292e;
  height: 54px;
  .header-middle-area {
    .nav {
      .link {
        //https://tailwindcss.com/docs/upgrading-to-v2#update-renamed-utility-classes
        @apply mr-4 cursor-pointer font-semibold  text-sm whitespace-nowrap;
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
      @apply text-base text-white cursor-pointer leading-6 transition-opacity duration-300 whitespace-nowrap outline-none px-2 py-1;

      &:hover {
        @apply opacity-75;
      }
      &.round-border {
        @apply border border-solid border-gray-200 rounded-md overflow-auto;
      }
    }
  }
}
</style>
