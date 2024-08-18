<template>
  <div>
    <ApiWrapper :api-fn="doSomeThing">
      <template #default="scope">
        <div>
          <div>scope-slot:</div>
          <div>{{ scope }}</div>
        </div>
        <div>
          <div>result:</div>
          <div>{{ result }}</div>
        </div>
        <el-button
          :loading="scope.loading"
          @click="mySelfFnWrapper(scope.trigger)"
          >加载数据</el-button
        >
      </template>
    </ApiWrapper>
  </div>
</template>

<script>
import { doSomeThing } from './MockApi'
import ApiWrapper from './ApiWrapper.vue'
export default {
  name: 'TestHelloIndex',
  components: { ApiWrapper },
  data() {
    return {
      result: null,
      doSomeThing,
    }
  },
  methods: {
    // 第二次闭包
    async mySelfFnWrapper(fn, params) {
      // or this.params

      if (typeof fn === 'function') {
        const result = await fn(params)

        this.result = result
        return result
      } else {
        return fn
      }
    },
  },
}
</script>

<style></style>
