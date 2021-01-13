<template>
  <div>
    <!-- <ClientOnly>
      <MonacoEditor v-model="code" class="editor" language="javascript" />
    </ClientOnly> -->
    <!-- <section class="container mx-auto py-8">
      <div
        ref="editor"
        style="width: 800px; height: 600px; border: 1px solid #ccc"
      />
    </section> -->
    <MonacoEditor v-model="code" class="editor" language="javascript" />
  </div>
</template>

<script>
/**
 * @type {import('monaco-editor')}
 */
// let monaco
// if (process.client) {
//   monaco = require('monaco-editor')
// }

import MonacoEditor from 'vue-monaco'
export default {
  components: {
    MonacoEditor
  },
  data () {
    return {
      code: 'const noop = () => {}'
    }
  },
  mounted () {
    // console.log(monaco)
    // this.editor = monaco.editor.create(this.$refs.editor, {
    //   value: '',
    //   language: 'json'
    // })
    // this.editor.setValue(JSON.stringify(this.user, null, '  '))
  }
}
</script>

<style>
.editor {
  width: 600px;
  height: 800px;
}
</style>
