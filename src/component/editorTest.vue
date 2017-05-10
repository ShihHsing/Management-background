<template>
  <quill-editor
    ref="myTextEditor"
    v-model="content"
    :options="editorOption">
  </quill-editor>
</template>

<script>
  export default {
    data() {
      return {
        name: 'editorTest',
        content: '<h2>I am Example 1</h2>',
        editorOption: {}
      }
    },
    methods: {
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
        this.content = html
      }
    },
    computed: {
      editor() {
        return this.$refs.myTextEditor
      }
    },
    mounted() {
      console.log('this is my editor', this.editor)
    }
  }
</script>

<style lang="less">
  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 25em;
  }
  .html {
    height: 9em;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-top: none;
    resize: vertical;
  }
</style>
