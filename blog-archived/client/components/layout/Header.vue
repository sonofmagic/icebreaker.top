<script>
import { mapGetters } from 'vuex'
import { Dialog } from 'vant'
import DarkModeToggle from './DarkModeToggle.vue'
import defaultAvatar from '@/assets/img/default-avatar.png'
import Logo from '@/assets/img/avatar.jpg'

export default {
  components: {
    DarkModeToggle,
  },
  data() {
    return {
      logoUri: Logo,
      RegisterVisible: false,
      SignInVisible: false,

      outSideLinks: [
        {
          href: 'https://weapp-tw.icebreaker.top/',
          title: 'Weapp-tailwindcss',
        },
        {
          href: 'https://vite.icebreaker.top/',
          title: 'Weapp-vite',
        },
        {
          href: 'https://ui.icebreaker.top/zh-CN',
          title: 'IceStack',
        },
        {
          href: 'https://monorepo.icebreaker.top/',
          title: 'Monorepo',
        },
        {
          href: 'https://eslint.icebreaker.top/',
          title: 'Eslint',
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
        {
          key: 500,
          to: '/friends',
          title: 'My Friends',
        },
      ],
      defaultAvatar,
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
  methods: {
    async logout() {
      try {
        await Dialog.confirm({ message: '确定登出?' })
        // await this.$confirm('确定登出?')
        await this.$store.dispatch('user/signOut')
      }
      catch {}
    },
  },
}
</script>

<template>
  <header class="site-header">
    <div class="mr-4 flex items-center">
      <router-link class="flex-shrink-0" to="/">
        <img class="h-8 w-8 rounded-full" :src="logoUri">
      </router-link>
    </div>
    <div class="header-middle-area hidden flex-grow text-left sm:flex">
      <nav class="nav ml-4 hidden lg:flex lg:items-center">
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
        <nuxt-link
          v-for="inlink in inSideLinks"
          :key="inlink.key"
          class="link"
          :to="inlink.to"
        >
          {{ inlink.title }}
        </nuxt-link>
        <!-- <span>
          <ThemeSwitch></ThemeSwitch>
        </span> -->
      </nav>
    </div>

    <client-only>
      <div class="tail flex flex-grow justify-end sm:flex-grow-0">
        <DarkModeToggle class="mr-2" />
      </div>
    </client-only>
  </header>
</template>

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
