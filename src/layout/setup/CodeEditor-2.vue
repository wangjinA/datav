<template>
  <MonacoEditor
    height="200"
    :language="type_filter"
    :code="code"
    @mounted="onMounted"
    @codeChange="onCodeChange"
  >
  </MonacoEditor>
</template>

<script>
import { beautifierConf } from "./config";
import MonacoEditor from "vue-monaco-editor";

export default {
  name: "CodeEditor",
  components: {
    MonacoEditor,
  },
  props: {
    value: null,
    type: {
      type: String,
      default: "javascript",
    },
  },
  data() {
    return {
      code: "",
    };
  },
  computed: {
    type_filter() {
      return this.type.toLowerCase();
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        console.log(value);
        let _value = value;
        if (this.type_filter === "json") {
          try {
            _value = JSON.stringify(_value);
          } catch (error) {
            console.log(_value);
            console.error("json转换出错");
            return;
          }
        }
        this.code = window.beautifier.js(_value, beautifierConf.js);
      },
    },
  },
  methods: {
    onMounted(editor) {
      /* eslint-disable */
      this.editor = editor;
      console.log(this.editor);
    },
    onCodeChange(editor) {
      let _value = editor.getValue();
      if (this.type_filter === "json") {
        try {
          _value = JSON.parse(_value);
        } catch (error) {
          console.log(_value);
          console.error("json转换出错");
          return;
        }
      }
      this.$emit("input", _value);
    },

    preventDefaultSave(e) {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
      }
    },
    onOpen() {},
    refresh() {
      try {
        this.$emit("input", JSON.parse(this.jsonEditor.getValue()));
      } catch (error) {
        this.$notify({
          title: "错误",
          message: "JSON格式错误，请检查",
          type: "error",
        });
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", this.preventDefaultSave);
  },
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
#CodeEditor {
  height: 200px;
}
</style>
