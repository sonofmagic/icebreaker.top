<script>
let DPlayer
if (process.client) {
  DPlayer = require('dplayer')
}
export default {
  name: 'SomPlayer',
  async mounted() {
    const { fileList } = await this.$cloudbase.getTempFileURL({
      fileList: [
        {
          fileID:
            'cloud://mp-129627.6d70-mp-129627-1257725330/video/shareplus.mp4',
          maxAge: 1000 * 60 * 5,
        },
      ],
    })
    const videoUrl = fileList[0].tempFileURL
    this.dp = new DPlayer({
      container: this.$refs.dplayer,
      video: {
        url: videoUrl,
      },
    })
  },
}
</script>

<template>
  <div ref="dplayer" />
</template>

<style></style>
