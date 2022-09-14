<template>
  <div class="example">
    <quill-editor
      class="editor"
      ref="myTextEditor"
      :value="content"
      :options="editorOption"
      @change="onEditorChange"
    />
    <div class="output ql-snow">
      <div class="ql-editor" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import hljs from "highlight.js";
import debounce from "debounce";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
export default {
  name: "Tiptap",
  components: {
    quillEditor,
  },
  props: {
    value: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
          ],
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
        },
      },
      content: ``,
    };
  },
  mounted() {
    if (this.value) {
      this.content = this.value;
    }
  },
  methods: {
    onEditorChange: debounce(function (value) {
      this.content = value.html;
      this.$emit("onChange", this.content);
    }, 466),
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    },
    contentCode() {
      return hljs.highlightAuto(this.content).value;
    },
  },
};
</script>

<style lang="scss" scoped>
.example {
  display: flex;
  flex-direction: column;
  background-color: white;
  color: black;
  .editor {
    min-height: 30vh;
    overflow: hidden;
  }
  .output {
    width: 100%;
    height: auto !important;
    min-height: 10vh !important;
    margin: 0;
    border: 1px solid #ccc;
    overflow-y: auto;
    resize: vertical;
    &.code {
      padding: 1rem;
      height: 16rem;
    }
    &.ql-snow {
      border-top: none;
      height: 24rem;
    }
  }
}
</style>
