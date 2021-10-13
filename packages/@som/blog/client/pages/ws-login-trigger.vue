<template>
  <div
    class="
      container
      mx-auto
      flex flex-col
      items-center
      justify-center
      h-screen
      text-4xl
    "
  >
    <div>SocketId</div>
    <el-input v-model="formValue.SocketId"></el-input>
    <el-button @click="emitLogin">发射</el-button>
  </div>
</template>

<script>
import { io } from 'socket.io-client'
export default {
  data() {
    return {
      formValue: {
        SocketId: '',
      },
    }
  },
  mounted() {
    const socket = (this.socket = io('http://127.0.0.1:9000'))

    // debugger
    socket.on('connect', () => {})
    socket.on('success', (userinfo, ...args) => {
      console.log(userinfo, ...args)
      this.$store.dispatch('cache/setWsTempData', userinfo)
      this.$router.push('/ws-login-success')
    })
    socket.on('disconnect', () => {
      this.socketId = socket.id // undefined
      console.log(socket.id, socket.connected)
    })
  },
  methods: {
    emitLogin() {
      console.log(this.socket)
      this.socket.emit('login', {
        id: this.formValue.SocketId,
        userinfo: {
          p: '123',
          ds: {
            ew: '34',
            fds: '',
          },
        },
      })
    },
  },
}
</script>

<style></style>
