<script>
import { mapGetters } from 'vuex'
import trim from 'lodash/trim'
// import marked from 'marked'
// import DOMPurify from 'dompurify'
import SignInPopup from '@/components/layout/SignInPopup'

export default {
  name: 'PostCommentZone',
  components: {
    SignInPopup,
  },
  data() {
    return {
      formValue: {
        comment: '',
      },
      signInVisible: false,
      tabActiveName: 'Write',
      tabList: ['Write'], // , 'Preview'
      previewHtml: '',
    }
  },
  computed: {
    ...mapGetters('user', ['isRealLogined']),
    btnDisabled() {
      return !this.formValue.comment
    },
    isWrite() {
      return this.tabActiveName === 'Write'
    },
    isPreview() {
      return this.tabActiveName === 'Preview'
    },
  },
  watch: {
    tabActiveName(nv) {
      if (nv === 'Preview') {
        this.doPreview()
      }
    },
  },
  methods: {
    // doPreview() {
    //   this.previewHtml = this.getPreviewHtml()
    // },
    // getPreviewHtml() {
    //   return this.getSafeHtml(marked(this.formValue.comment))
    // },
    // getSafeHtml(dirty) {
    //   return DOMPurify.sanitize(dirty)
    // },
    async doComment() {
      await this.$store.dispatch('user/comment', {
        id: this.$route.path,
        content: trim(this.formValue.comment),
      })
      this.formValue.comment = ''
      this.$emit('success')
    },
  },
}
</script>

<template>
  <ClientOnly>
    <div
      class="border border-solid border-border-default rounded overflow-auto"
    >
      <div class="toolbar">
        <div class="mb-[-1px]">
          <button
            v-for="tab in tabList"
            :key="tab"
            class="tab"
            :class="{ active: tabActiveName === tab }"
            @click.stop="tabActiveName = tab"
          >
            {{ tab }}
          </button>
        </div>
      </div>
      <div class="p-2">
        <div class="relative">
          <el-input
            v-show="isWrite"
            v-model="formValue.comment"
            class="dark"
            type="textarea"
            :rows="5"
            placeholder="Leave a comment"
            :disabled="!isRealLogined"
          />
          <!-- <div
            v-show="isPreview"
            class="preview-area antialiased nuxt-content-container"
          >
            <div
              v-if="previewHtml"
              class="markdown-body"
              v-html="previewHtml"
            ></div>
            <div v-else>Nothing to preview</div>
          </div> -->
          <div
            v-if="!isRealLogined"
            class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"
          >
            <div
              class="text-lg text-blue-500 cursor-pointer hover:underline"
              @click.stop="signInVisible = true"
            >
              Click here for Login
            </div>
          </div>
        </div>
        <div class="flex flex-row-reverse pt-4">
          <el-button
            size="small"
            type="primary"
            :disabled="btnDisabled || !isRealLogined"
            @click="doComment"
          >
            {{ isRealLogined ? 'Comment' : 'You should login first' }}
          </el-button>
        </div>
      </div>
      <SignInPopup v-model="signInVisible" />
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.toolbar {
  @apply h-12 pl-2 flex items-end border-b border-solid border-border-default;
  .tab {
    @apply py-2 px-4 text-sm border border-solid border-border-default bg-canvas-default text-fg-default;

    border-bottom: 0;
    &.active {
      // @apply bg-white  border-solid border-gray-300;

      border-radius: 6px 6px 0 0;
    }
  }
}

::v-deep .el-textarea.dark {
  .el-textarea__inner {
    @apply rounded-md border-b border-solid border-border-default bg-canvas-inset;
  }
}
</style>
