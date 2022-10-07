<template>
  <ElForm :model="formValue" label-width="120px" @submit.prevent>
    <ElFormItem label="avatar">
      <Avatar v-model:path="formValue.avatar_url" />
      <!-- <ElUpload>
        <ElAvatar :src="formValue.avatar_url" />
      </ElUpload> -->
    </ElFormItem>
    <ElFormItem label="email">
      <ElInput readonly :model-value="user.email" />
    </ElFormItem>
    <ElFormItem label="username">
      <ElInput v-model="formValue.username" />
    </ElFormItem>
    <ElFormItem label="website">
      <ElInput v-model="formValue.website" />
    </ElFormItem>
    <ElButton type="primary" @click="updateProfile">
      Update
    </ElButton>
  </ElForm>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem, ElButton, ElInput, ElUpload, ElAvatar } from 'element-plus'

const supabase = useSupabaseClient()

interface IFormValue {
  username: string
  website: string
  avatar_url: string
}
const formValue = reactive<IFormValue>({
  username: '',
  website: '',
  avatar_url: ''
})
const loading = ref(true)

loading.value = true
const user = useSupabaseUser()

const { data } = await supabase
  .from('profiles')
  .select('username, website, avatar_url')
  .eq('id', user.value.id)
  .single()
if (data) {
  formValue.username = data.username
  formValue.website = data.website
  formValue.avatar_url = data.avatar_url
}
loading.value = false

async function updateProfile () {
  try {
    loading.value = true

    const updates = {
      id: user.value.id,
      ...formValue,
      updated_at: new Date()
    }
    const { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal' // Don't return the value after inserting
    })
    if (error) { throw error }
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

</script>
