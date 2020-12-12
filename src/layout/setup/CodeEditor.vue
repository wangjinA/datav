<template>
  <prism-editor
    class="CodeEditor"
    v-model="code"
    :highlight="highlighter"
    line-numbers
  ></prism-editor>
</template>

<script>
// demo https://codesandbox.io/s/61yrlnlnmn?file=/src/App.vue
// document https://github.com/koca/vue-prism-editor
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles
import { parse, stringify } from "@/lib/utils";
export default {
  name: "CodeEditor",
  props: {
    type: {
      type: String,
      default: 'javascript'
    },
    value: null
  },
  components: {
    PrismEditor,
  },
  data() {
    return {
      code: "",
    };
  },
  computed: {
    type_filter() {
      return this.type.toLowerCase()
    }
  },
  watch: {
    code() {
      let code = this.code
      if(this.type_filter === 'json'){
        try {
          code = parse(code)
        } catch (error) {
          console.error(error);
          return
        }
      }
      this.$emit('input', code)
    },
    value: {
      immediate: true,
      handler(value) {
        let _value = value
        if(this.type_filter === 'json'){
          try {
            _value = stringify(_value)
          } catch (error) {
            console.error(error);
            return
          }
        }
        this.code = _value
      }
    }
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages[this.type_filter || 'javascript']); // languages.<insert language> to return html with markup
    },
  },

};
</script>

<style lang="less" scoped>

// required class
.CodeEditor {
  min-height: 200px;
  background: #2d2d2d;
  color: #ccc;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
  overflow: hidden;
  /deep/ textarea{
    &:focus{
      border-color: var(--primary-color);
      outline-color: var(--primary-color);
    }
  }
  /deep/ .prism-editor__container{
    height: 100%;
  }
}
</style>