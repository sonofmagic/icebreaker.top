<template>
  <div ref="editorDOM"></div>
  <!-- <button @click="insert">log</button> -->
</template>

<script lang="ts">
import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup'
import { Panel, showPanel } from '@codemirror/panel'
import { javascript } from '@codemirror/lang-javascript'
// import {} from '@codemirror/highlight'
// import { StateField, StateEffect } from '@codemirror/state'
import { Text } from '@codemirror/text'
import { defineComponent, ref, onMounted } from 'vue'
type EditorParentType = Element | DocumentFragment | undefined

function wordCountPanel(view: EditorView): Panel {
  const dom = document.createElement('div')
  dom.textContent = countWords(view.state.doc)
  return {
    dom,
    update(update) {
      if (update.docChanged) dom.textContent = countWords(update.state.doc)
    },
  }
}

function countWords(doc: Text) {
  let count = 0
  const iter = doc.iter()
  while (!iter.next().done) {
    let inWord = false
    for (let i = 0; i < iter.value.length; i++) {
      const word = /\w/.test(iter.value[i])
      if (word && !inWord) count++
      inWord = word
    }
  }
  return `Word count: ${count}`
}

export function wordCounter() {
  return showPanel.of(wordCountPanel)
}

export default defineComponent({
  name: 'EditorIndex',
  setup() {
    const editorDOM = ref<EditorParentType>()
    let view: EditorView
    onMounted(() => {
      view = new EditorView({
        state: EditorState.create({
          extensions: [basicSetup, javascript(), wordCounter()],
        }),
        parent: editorDOM.value,
      })
    })
    const insert = () => {
      view.dispatch({
        changes: { from: 0, insert: '#!/usr/bin/env node\n' },
      })
    }
    return {
      editorDOM,
      insert,
    }
  },
})
</script>

<style></style>
