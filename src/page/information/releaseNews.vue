<template>
  <div>
    <quill-editor ref="myTextEditor" v-model="content" :config="editorOption">
    </quill-editor>
  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'; // 导入quillEditor组件
  export default {
    data: function () {
      return{
        content: '',
        editorOption: {

        }
      }
    },
    components: {
      quillEditor
    }
  }
</script>
