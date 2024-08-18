<template>
  <section>
    <el-form ref="form" class="w-64" :model="formData" :rules="formRules">
      <el-form-item ref="username" prop="username">
        <el-input
          v-model.trim="formData.username"
          placeholder="用户名/邮箱"
          name="username"
          @keyup.native.enter="login"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model.trim="formData.password"
          placeholder="密码"
          name="password"
          :type="passwordVisible ? 'text' : 'password'"
          @keyup.native.enter="login"
        >
          <template #suffix>
            <div class="pr-1">
              <i
                style="cursor: pointer"
                :class="
                  passwordVisible ? 'el-icon-refresh-left' : 'el-icon-view'
                "
                @click="switchPasswordType"
              ></i>
            </div>
          </template>
        </el-input>
      </el-form-item>
      <div class="flex justify-between">
        <el-button type="primary" :loading="loginBtnLoading" @click="login"
          >登录</el-button
        >
        <el-button @click="forgetPassword">忘记密码</el-button>
      </div>
    </el-form>
  </section>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      passwordVisible: false,
      isForget: false,
      formData: {
        username: null,
        password: null,
      },
      loginBtnLoading: false,
      formRules: {
        username: [
          {
            required: true,
            message: '请输入用户名/邮箱',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
          },
        ],
      },
    }
  },
  methods: {
    async forgetPassword() {
      try {
        await this.$store.dispatch('user/resetPassword', {
          email: this.formData.username,
        })

        this.$message.success(`已发送邮件到您 ${this.formData.username} 邮箱内`)
      } catch (error) {
        this.$message.error(error.msg)
        console.debug(error)
      }
    },
    switchPasswordType() {
      this.passwordVisible = !this.passwordVisible
    },
    login() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          return
        }
        try {
          this.loginBtnLoading = true
          await this.$store.dispatch('user/login', this.formData)
          this.$emit('success')
        } catch (error) {
          this.$message.error(error.msg)
          console.debug(error)
        } finally {
          this.loginBtnLoading = false
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
