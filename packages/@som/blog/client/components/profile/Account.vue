<template>
  <section>
    <el-form :model="formValue" label-width="80px" size="mini">
      <el-form-item label="用户名">
        <div class="flex space-x-4">
          <template v-if="usernameEdit">
            <div class="w-64">
              <el-input v-model.trim="formValue.newUsername"></el-input>
            </div>
            <el-button
              type="primary"
              :loading="usernameEditLoading"
              @click="updateUsername"
              >确定</el-button
            >
            <el-button
              :loading="usernameEditLoading"
              @click="toggleUsernameEdit"
              >取消</el-button
            >
          </template>
          <template v-else>
            <template v-if="user.username">
              <span>{{ user.username }}</span>

              <el-button type="primary" @click="toggleUsernameEdit"
                >更换用户名</el-button
              >
            </template>
            <template v-else>
              <el-button type="primary" @click="toggleUsernameEdit"
                >立即设置</el-button
              >
            </template>
          </template>
        </div>
      </el-form-item>
      <el-form-item label="邮箱">
        <div class="flex space-x-4">
          <template v-if="emailEdit">
            <div class="w-64">
              <el-input v-model.trim="formValue.newEmail"></el-input>
            </div>
            <el-button
              type="primary"
              :loading="emailEditLoading"
              @click="updateEmail"
              >确定</el-button
            >
            <el-button :loading="emailEditLoading" @click="toggleEmailEdit"
              >取消</el-button
            >
          </template>
          <template v-else>
            <template v-if="user.email"
              ><span>{{ user.email }}</span>
              <el-button type="primary" @click="toggleEmailEdit"
                >更换登录邮箱</el-button
              >
            </template>
            <template v-else>
              <el-button type="primary" @click="toggleEmailEdit"
                >立即设置</el-button
              >
            </template>
          </template>
        </div>
      </el-form-item>
      <el-form-item label="密码">
        <div class="flex space-x-4">
          <template v-if="passwordEdit">
            <div class="w-64">
              旧密码：
              <el-input v-model.trim="formValue.oldPassword"></el-input>
            </div>
            <div class="w-64">
              新密码：
              <el-input v-model.trim="formValue.newPassword"></el-input>
            </div>
            <el-button
              type="primary"
              :loading="passwordEditLoading"
              @click="updatePassword"
              >确定</el-button
            >
            <el-button :loading="passwordEditLoading" @click="toggleEmailEdit"
              >取消</el-button
            >
          </template>
          <template v-else>
            <template v-if="user.hasPassword">
              <span>已设置</span>

              <el-button type="primary" @click="togglePasswordEdit"
                >修改密码</el-button
              >
              <el-button type="primary" @click="goResetPassword"
                >重置密码</el-button
              >
            </template>
            <template v-else>
              <el-button type="primary" @click="togglePasswordEdit"
                >立即设置</el-button
              >
            </template>
          </template>
        </div>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { passwordRule } from '@/utils/formRules'
// import trim from 'lodash/trim'
export default {
  name: 'ProfileAccount',
  filters: {},
  data() {
    return {
      formValue: {
        newUsername: '',
        newEmail: '',
        newPassword: '',
        oldPassword: '',
      },
      formRules: {
        newUsername: [
          {
            required: true,
          },
        ],
        newEmail: [
          {
            required: true,
          },
          {
            type: 'email',
          },
        ],
        newPassword: passwordRule,
        oldPassword: passwordRule,
      },
      usernameEdit: false,
      usernameEditLoading: false,
      emailEdit: false,
      emailEditLoading: false,
      passwordEdit: false,
      passwordEditLoading: false,
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
  methods: {
    toggleUsernameEdit() {
      if (!this.usernameEdit) {
        this.formValue.newUsername = this.user.username
      } else {
        this.formValue.newUsername = ''
      }
      this.usernameEdit = !this.usernameEdit
    },
    toggleEmailEdit() {
      if (!this.emailEdit) {
        this.formValue.newEmail = this.user.email
      } else {
        this.formValue.newEmail = ''
      }
      this.emailEdit = !this.emailEdit
    },
    togglePasswordEdit() {
      this.formValue.newPassword = ''
      this.formValue.oldPassword = ''
      this.passwordEdit = !this.passwordEdit
    },
    async goResetPassword() {
      await this.$auth.sendPasswordResetEmail(this.user.email)
      this.$message.success('已发送邮件到您 ' + this.user.email + ' 邮箱内')
    },
    async updateUsername() {
      try {
        this.usernameEditLoading = true
        // 只能是英文
        const registered = await this.$auth.isUsernameRegistered(
          this.formValue.newUsername
        )
        if (!registered) {
          await this.$auth.currentUser.updateUsername(
            this.formValue.newUsername
          )
          await this.$store.dispatch('user/refresh')
          this.$message.success('用户名修改成功！')
          this.toggleUsernameEdit()
        } else {
          this.$message.warning('当前用户名已经被注册，请更换')
        }
      } catch (err) {
        console.debug(err)
      } finally {
        this.usernameEditLoading = false
      }
    },
    async updateEmail() {
      try {
        this.emailEditLoading = true
        await this.$auth.currentUser.updateEmail(this.formValue.newEmail)
        this.$message.success(
          '已发送验证邮件到您' + this.formValue.newEmail + '的邮箱'
        )
      } catch (err) {
        console.debug(err)
      } finally {
        this.emailEditLoading = false
      }
    },
    async updatePassword() {
      await this.$auth.currentUser.updatePassword(
        this.formValue.newPassword,
        this.formValue.oldPassword
      )
      await this.$store.dispatch('user/refresh')
      this.$message.success('更新密码成功')
      this.passwordEdit = !this.passwordEdit
    },
  },
}
</script>

<style></style>
