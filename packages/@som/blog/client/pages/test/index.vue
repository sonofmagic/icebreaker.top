<template>
  <section class="container mx-auto py-8">
    <div
      ref="editor"
      style="width: 800px; height: 600px; border: 1px solid #ccc"
    >
      {{ user }}
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
// import { authTest } from '@/api/test'
/**
 * @type {import('monaco-editor')}
 */
// let monaco
// if (process.client) {
//   monaco = require('monaco-editor')
// }

const { user } = mapGetters('user', ['user'])
export default {
  name: 'TestIndex',
  computed: {
    user() {
      return user.call(this)
    },
  },

  mounted() {
    // authTest()
    // this.editor = monaco.editor.create(this.$refs.editor, {
    //   value: '',
    //   language: 'json',
    // })
    // this.editor.setValue(JSON.stringify(this.user, null, '  '))
  },
}
</script>

<style></style>
