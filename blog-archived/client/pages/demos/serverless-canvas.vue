<template>
  <div class="container mx-auto">
    <div class="flex flex-col sm:flex-row justify-between py-16 space-y-4">
      <!-- <van-uploader v-model="fileList" :max-count="1" /> -->
      <el-upload
        class="
          w-full
          sm:w-5/12
          border-dashed border-gray-400 border-4
          flex
          items-center
          justify-center
        "
        style="min-height: 75vh"
        :action="action"
        :http-request="upload"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
        :on-progress="handleAvatarProgress"
      >
        <div class="w-full h-full">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon">点击这里上传</i>
          <el-progress :percentage="percentage"></el-progress>
        </div>
      </el-upload>

      <div
        class="
          w-full
          sm:w-5/12
          border-dashed border-gray-400 border-4
          flex
          items-center
          justify-center
        "
        style="min-height: 75vh"
      >
        <img v-if="anotherImageUrl" :src="anotherImageUrl" />
        <div v-else>这里是输出结果</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { isProd } from '@/utils/env'

// const action =
//   (isProd ? 'https://svg.icebreaker.top/' : 'http://localhost:9000/') +
//   'api/v1/img/gray'

import { upload2Gray } from '@/api/upload'
export default {
  data() {
    return {
      fileList: [],
      action: '',
      imageUrl: '',
      anotherImageUrl: '',
      percentage: 0,
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // console.log(res, file)
      this.imageUrl = URL.createObjectURL(file.raw)
      const anotherImageUrl = URL.createObjectURL(res)
      this.anotherImageUrl = anotherImageUrl
    },
    handleAvatarProgress(p) {
      // console.log(p)
      this.percentage = p
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
    async upload(option) {
      // console.log(option)
      const { file, onProgress, onSuccess, onError, headers } = option

      const res = await upload2Gray(file, {
        onProgress,
      })
      // onSuccess(res.data, file)
      return res.data
      // console.log(res)
    },
  },
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  // border: 1px dashed #d9d9d9;
  // border-radius: 6px;
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
  // width: 178px;
  // height: 178px;
  // line-height: 178px;
  text-align: center;
}
.avatar {
  // width: 178px;
  // height: 178px;
  display: block;
}
</style>
