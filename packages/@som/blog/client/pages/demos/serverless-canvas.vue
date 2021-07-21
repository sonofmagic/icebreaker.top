<template>
  <div class="container mx-auto">
    <div class="flex justify-between py-16">
      <div
        class="
          w-2/5
          h-96
          border-dashed border-gray-400 border-4
          flex
          items-center
          justify-center
        "
      >
        <!-- <van-uploader v-model="fileList" :max-count="1" /> -->
        <el-upload
          class="avatar-uploader"
          :action="action"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div
        class="
          w-2/5
          h-96
          border-dashed border-gray-400 border-4
          flex
          items-center
          justify-center
        "
      ></div>
    </div>
  </div>
</template>

<script>
import { isProd } from '@/utils/env'
const action =
  (isProd ? 'https://svg.icebreaker.top/' : 'http://localhost:9000/') +
  'api/v1/img/gray'
export default {
  data() {
    return {
      fileList: [],
      action,
      imageUrl: '',
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 4

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 4MB!')
      }
      return isLt2M // isJPG &&
    },
  },
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
