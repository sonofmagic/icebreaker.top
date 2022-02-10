<template>
  <FormProvider :form="form">
    <Field name="input" :component="[Input, { placeholder: '请输入' }]" />
  </FormProvider>
</template>

<script lang="ts">
import Vue from 'vue'
import { Input } from 'ant-design-vue'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/vue'
import 'ant-design-vue/dist/antd.css'
export default Vue.extend({
  components: { FormProvider, Field },
  data () {
    return {
      Input,
      form: createForm()
    }
  }
})
</script>

<style scoped>
</style>
