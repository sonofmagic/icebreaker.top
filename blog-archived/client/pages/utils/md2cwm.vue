<script>
import md2cwm from 'md2cwm'
import copyTextMixin from '@/mixins/copyTextMixin'

export default {
  name: 'Md2Cwm',
  mixins: [copyTextMixin],
  data() {
    return {
      orgin: '',
      target: '',
    }
  },
  methods: {
    md2cwm,
    generate() {
      this.target = md2cwm(this.orgin)
    },
    onCopy() {
      this.copyText(this.target)
    },
  },
}
</script>

<template>
  <div class="container mx-auto">
    <div
      class="flex flex-col items-stretch justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0"
    >
      <div class="flex-1">
        <div class="h-10">
          把原始markdown文本放这
        </div>
        <div class="edit-area">
          <textarea
            v-model="orgin"
            class="edit-textarea hover-scroll-bar"
          />
        </div>
      </div>
      <div class="mx-2">
        <button class="btn btn-primary rounded-md px-4 py-2" @click="generate">
          生成
        </button>
      </div>
      <div class="flex-1">
        <div class="h-10">
          <span>把结果以 Wiki Markup 导入Confluence 就可以了</span>
          <button class="btn rounded-md px-2 py-1" @click="onCopy">
            复制
          </button>
        </div>
        <div class="edit-area">
          <textarea
            v-model="target"
            class="edit-textarea hover-scroll-bar"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.edit-area {
  @apply h-[calc(100vh-200px)] w-full rounded-md border border-border-default  p-2;
  .edit-textarea {
    @apply h-full w-full resize-none bg-codemirror-bg text-codemirror-text;
  }
}
</style>
