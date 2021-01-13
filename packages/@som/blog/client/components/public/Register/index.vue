<template>
  <section>
    <div class="tips">您账户数据将被保存在受信任的第三方平台。</div>
    <el-form ref="form" :model="formValue">
      <el-form-item prop="email" :rules="formRules.email">
        <el-input
          v-model.trim="formValue.email"
          prefix-icon="el-icon-message"
          placeholder="邮箱"
          @keyup.native.enter="submit"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" :rules="formRules.password">
        <el-input
          v-model.trim="formValue.password"
          :type="passwordVisible ? 'text' : 'password'"
          prefix-icon="el-icon-lock"
          placeholder="密码"
          @keyup.native.enter="submit"
        >
          <template #suffix>
            <i
              style="cursor: pointer"
              :class="passwordVisible ? 'el-icon-refresh-left' : 'el-icon-view'"
              @click="switchPasswordType"
            ></i>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="flex justify-center">
      <el-button :loading="registerBtnLoading" type="primary" @click="submit"
        >注册</el-button
      >
    </div>
  </section>
</template>

<script>
import { passwordRule } from '@/utils/formRules'
import errorHandler from '@/cloudbase/errorHandler'
export default {
  name: 'Register',
  data() {
    return {
      registerBtnLoading: false,
      passwordVisible: false,
      formValue: {
        email: '',
        password: '',
      },
      formRules: {
        email: [
          {
            required: true,
            whitespace: true,
            message: '请填写您的邮箱',
          },
          {
            type: 'email',
            message: '请填写正确的邮箱格式',
          },
        ],
        password: passwordRule,
      },
    }
  },
  methods: {
    switchPasswordType() {
      this.passwordVisible = !this.passwordVisible
    },
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          return
        }
        try {
          const { email, password } = this.formValue
          this.registerBtnLoading = true
          await this.$auth
            .signUpWithEmailAndPassword(email, password)
            .catch(errorHandler)
          this.$message.success('邮件已发送到您填写的邮箱，请注意查收!')
          this.$emit('success')
        } catch (error) {
          this.$message.error(error.msg)
          this.$emit('error', error)
        } finally {
          this.registerBtnLoading = false
        }
      })
    },
    clearValidate() {
      this.$refs.form.clearValidate()
    },
    resetFields() {
      this.$refs.form.resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.tips {
  font-size: 14px;
  color: #24292e;
  margin-bottom: 16px;
}
</style>
