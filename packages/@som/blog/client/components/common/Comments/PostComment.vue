<template>
  <div class="border border-gray-300 rounded">
    <div class="toolbar bg-gray-100 h-10"></div>
    <div class="p-2">
      <div class="relative">
        <el-input
          v-model="formValue.comment"
          type="textarea"
          :rows="5"
          placeholder="Leave a comment"
          :disabled="!isRealLogined"
        ></el-input>
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
</template>

<script>
import { mapGetters } from 'vuex'
import trim from 'lodash/trim'
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
    }
  },
  computed: {
    ...mapGetters('user', ['isRealLogined']),
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
