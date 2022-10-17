<template>
  <Swiper :allow-touch-move="false" class="w-full">
    <SwiperSlide>
      <EmailForm></EmailForm>
    </SwiperSlide>
    <SwiperSlide>
      <VerifyOtp></VerifyOtp>
    </SwiperSlide>
  </Swiper>
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
