<template>
  <div class="flex flex-col space-y-4">
    <div>
      <div class="text-sm">自己写着玩的：</div>
      <div
        v-for="item in selfQrcode"
        :key="item.alt"
        class="text-center w-40 text-sm my-2"
      >
        <img class="w-40" :src="item.src" :alt="item.alt" />
        <div class="mt-2">{{ item.alt }}</div>
      </div>
    </div>

    <!-- <hr />
    <div>
      <div class="text-sm">给公司写的(一部分)：</div>
      <div
        v-for="item in companyQrcode"
        :key="item.alt"
        class="text-center w-40 text-sm my-2"
      >
        <img class="w-40" :src="item.src" :alt="item.alt" />
        <div class="mt-2">{{ item.alt }}</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import 股加加管理端 from '@/assets/img/mini/股加加管理端.jpg'
import 股加加员工端 from '@/assets/img/mini/股加加员工端.jpg'
import 股权健康体检 from '@/assets/img/mini/股权健康体检.jpg'
import 股权激励设计助手 from '@/assets/img/mini/股权激励设计助手.jpg'
import 股加融资计算器 from '@/assets/img/mini/股加融资计算器.jpg'
import 程序员名片 from '@/assets/img/mini/程序员名片.jpg'
export default {
  name: 'MiniProgramsBar',
  data() {
    return {
      companyQrcode: [
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
      selfQrcode: [
        {
          alt: '程序员名片',
          src: 程序员名片,
        },
      ],
    }
  },
}
</script>
