<template>
  <div class="wrapper">
    <el-select style="width: 100%" v-model="value" multiple placeholder="请选择">
      <HcmOptionGroup v-for="group in options" :key="group.label" :label="group.label">
        <HcmOption v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"> </HcmOption>
      </HcmOptionGroup>
    </el-select>
  </div>
</template>

<script>
import HcmOptionGroup from './option-group.vue'
import HcmOption from './option.vue'
export default {
  components: {
    HcmOptionGroup,
    HcmOption
  },
  data () {
    return {
      options: [
        {
          label: '个人信息',
          options: [
            {
              value: 'a1',
              label: '姓名'
            },
            {
              value: 'a2',
              label: '最后工作日期'
            },
            {
              value: 'a3',
              label: '离职日期'
            },
            {
              value: 'a4',
              label: '离职原因'
            },
            {
              value: 'a5',
              label: '离职生效日期'
            },
            {
              value: 'a6',
              label: '国籍'
            },

            {
              value: 'a7',
              label: '下属'
            },
            {
              value: 'a8',
              label: '经理类型'
            },
            {
              value: 'a8',
              label: '新经理'
            },
            {
              value: 'a9',
              label: '啥豆腐干豆腐'
            },
            {
              value: 'a10',
              label: '是的法规环境'
            }
          ]
        },
        {
          label: '雇佣信息',
          options: [
            {
              value: 'b1',
              label: '入职日期'
            },
            {
              value: 'b2',
              label: '雇佣单位'
            }
          ]
        },
        {
          label: '职位信息',
          options: [
            {
              value: 'c1',
              label: '组织'
            },
            {
              value: 'c2',
              label: '职位'
            },
            {
              value: 'c3',
              label: '职务'
            }
          ]
        }
      ],
      value: []
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  width: 40vw;
}
</style>
