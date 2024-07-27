<template>
  <section>
    <el-form
      :model="formValue"
      size="mini"
      label-position="top"
      class="flex space-x-8"
      @submit.native.prevent
    >
      <div>
        <el-form-item label="昵称">
          <div class="w-64">
            <el-input v-model="formValue.nickName"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formValue.gender">
            <el-option
              v-for="(label, key) in UserGender"
              :key="key"
              :label="label"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="国家/省/市" prop="location">
          <div v-if="formValue.location" class="w-64 flex space-x-4">
            <el-input
              key="country"
              v-model="formValue.location.country"
            ></el-input>
            <el-input
              key="province"
              v-model="formValue.location.province"
            ></el-input>
            <el-input key="city" v-model="formValue.location.city"></el-input>
          </div>
        </el-form-item>
        <el-button type="primary" @click="updateBaseInfo">修改</el-button>
      </div>
      <div>
        <CloudbaseUpload v-model="avatarList" @success="uploadAvatarSuccess">
          <el-avatar
            class="cursor-pointer"
            :size="128"
            :src="user.realAvatarUrl || defaultAvatar"
          ></el-avatar>
        </CloudbaseUpload>
      </div>
    </el-form>
  </section>
</template>

<script>
import { UserGender } from '@/enum/user'
import { mapGetters } from 'vuex'
import isObject from 'lodash/isObject'
import cloneDeep from 'lodash/cloneDeep'
import defaultAvatar from '@/assets/img/default-avatar.png'
import CloudbaseUpload from '@/components/common/CloudbaseUpload'
export default {
  name: 'ProfileBaseInfo',
  components: {
    CloudbaseUpload,
  },
  data() {
    return {
      UserGender,
      defaultAvatar,
      avatarList: [],
      formValue: {
        realAvatarUrl: '',
        avatarUrl: '',
        nickName: '',
        gender: '',
        location: {
          country: '',
          province: '',
          city: '',
        },
      },
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
  },

  watch: {
    user: {
      handler(nv) {
        Object.keys(this.formValue).forEach((x) => {
          if (isObject(nv[x])) {
            this.formValue[x] = cloneDeep(nv[x])
          } else {
            this.formValue[x] = nv[x]
          }
        })
      },
      immediate: true,
    },
  },
  methods: {
    async uploadAvatarSuccess(res) {
      const { fileID } = res
      await this.$auth.currentUser.update({
        avatarUrl: fileID,
      })
      await this.$store.dispatch('user/refresh')
      this.$message.success('上传头像成功！')
      this.avatarList = []
    },
    async updateBaseInfo() {
      const {
        nickName,
        gender,
        location: { country, province, city },
      } = this.formValue
      await this.$auth.currentUser.update({
        nickName,
        gender,
        country,
        province,
        city,
      })
      await this.$store.dispatch('user/refresh')
      this.$message.success('更新基本信息成功！')
    },
  },
}
</script>

<style></style>
