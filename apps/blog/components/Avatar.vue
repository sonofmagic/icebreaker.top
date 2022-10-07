<template>
  <div>
    <img v-if="src" :src="src" alt="Avatar" class="avatar image" style="width: 10em; height: 10em;">
    <div v-else class="avatar no-image" :style="{ height: size, width: size }" />

    <div style="width: 10em; position: relative;">
      <label class="button primary block" for="single">
        {{ uploading ? "Uploading ..." : "Upload" }}
      </label>
      <input
        id="single"
        style="position: absolute; visibility: hidden;"
        type="file"
        accept="image/*"
        :disabled="uploading"
        @change="uploadAvatar"
      >
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  path: {
    type: [String],
    default: undefined
  }
})
const { path } = toRefs(props)

const emit = defineEmits(['update:path', 'upload'])

const supabase = useSupabaseClient()

const uploading = ref(false)
const src = ref('')
const files = ref()
const downloadImage = async () => {
  if (!path.value) {
    return
  }
  try {
    const { data, error } = await supabase.storage
      .from('avatars')
      .download(path.value)
    if (error) { throw error }
    src.value = URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloading image: ', error.message)
  }
}

const uploadAvatar = async (evt) => {
  files.value = evt.target.files
  try {
    uploading.value = true
    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }
    const file = files.value[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file)
    if (uploadError) { throw uploadError }
    emit('update:path', filePath)
    emit('upload')
  } catch (error) {
    alert(error.message)
  } finally {
    uploading.value = false
  }
}

downloadImage()

watch(path, () => {
  if (path.value) {
    downloadImage()
  }
})
</script>
