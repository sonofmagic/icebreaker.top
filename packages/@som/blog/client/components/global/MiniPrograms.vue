<template>
  <div class="flex">
    <img
      v-for="item in imgs"
      :key="item.alt"
      class="w-48"
      :src="item.src"
      :alt="item.alt"
    />
  </div>
</template>

<script>
import 股加加管理端 from '@/assets/img/mini/股加加管理端.jpg'
import 股加加员工端 from '@/assets/img/mini/股加加员工端.jpg'
import 股权健康体检 from '@/assets/img/mini/股权健康体检.jpg'
import 股权激励设计助手 from '@/assets/img/mini/股权激励设计助手.jpg'
import 股加融资计算器 from '@/assets/img/mini/股加融资计算器.jpg'
export default {
  name: 'MiniProgramsBar',
  data() {
    return {
      imgs: [
        {
          alt: '股加加管理端',
          src: 股加加管理端,
        },
        {
          alt: '股加加员工端',
          src: 股加加员工端,
        },
        {
          alt: '股权健康体检',
          src: 股权健康体检,
        },
        {
          alt: '股权激励设计助手',
          src: 股权激励设计助手,
        },
        {
          alt: '股加融资计算器',
          src: 股加融资计算器,
        },
      ],
    }
  },
}
</script>
