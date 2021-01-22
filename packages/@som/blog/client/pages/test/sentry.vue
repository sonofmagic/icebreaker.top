<template>
  <div>
    <input v-model="formValue.value2" />
    <input v-model="formValue.value.cyc" />
  </div>
</template>

<script>
export default {
  name: 'SentryErrorTest',
  data() {
    return {
      formValue: {
        value: '',
      },
    }
  },
}
</script>

<style></style>
