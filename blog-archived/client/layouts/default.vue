<script>
import { Dialog } from 'vant'
import CommonSlot from '@/components/layout/CommonSlot'
// import Sitemap from '@/components/sitemap'
export default {
  name: 'PublicLayout',
  components: {
    CommonSlot,
    // Sitemap,
  },
  // middleware: ['theme'],
  // async mounted() {
  //   // this.showUpgradeDialog()
  //   const workbox = await window.$workbox
  //   if (workbox) {
  //     workbox.addEventListener('installed', (event) => {
  //       // If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
  //       if (event.isUpdate) {
  //         this.showUpgradeDialog()
  //         // whatever logic you want to use to notify the user that they need to refresh the page.
  //       }
  //     })
  //   }
  // },
  methods: {
    showUpgradeDialog() {
      Dialog.alert({
        title: '提示',
        message: '检测到新的内容',
        theme: 'round-button',
        confirmButtonText: '立即更新',
      }).finally(() => {
        location.reload()
      })
    },
  },
}
</script>

<template>
  <CommonSlot>
    <div>
      <Nuxt />
    </div>

    <!-- <Sitemap /> -->
  </CommonSlot>
</template>
