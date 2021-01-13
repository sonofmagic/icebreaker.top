<template>
  <div class="border border-gray-300 rounded">
    <div class="toolbar bg-gray-100 h-10"></div>
    <div class="p-2">
      <el-input
        v-model="formValue.comment"
        type="textarea"
        :rows="5"
        placeholder="Leave a comment"
      ></el-input>
      <div class="flex flex-row-reverse pt-4">
        <el-button
          size="small"
          type="primary"
          :disabled="btnDisabled"
          @click="doComment"
          >Comment</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import trim from 'lodash/trim'
export default {
  name: 'PostCommentZone',
  data() {
    return {
      formValue: {
        comment: '',
      },
    }
  },
  computed: {
    ...mapGetters('user', ['isLogined']),
    btnDisabled() {
      return !this.formValue.comment
    },
  },
  methods: {
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
