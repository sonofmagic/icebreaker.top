<template>
  <Swiper class="w-full">
    <SwiperSlide>
      <EmailForm></EmailForm>
    </SwiperSlide>
    <SwiperSlide>
      <VerifyOtp></VerifyOtp>
    </SwiperSlide>
  </Swiper>
  <!-- :allow-touch-move="false" -->
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { StateSymbol } from './constants'

provide(
  StateSymbol,
  reactive({
    email: '',
    phone: '',
    token: ''
  })
)
</script>
