<template>
  <codemirror
    class="CodeEditor"
    :value="code"
    :options="cmOptions"
    @ready="onCmReady"
    @focus="onCmFocus"
    @input="onCmCodeChange"
  />
</template>

<script>
// csdn https://blog.csdn.net/qq_16698261/article/details/106397108
// 官网 https://codemirror.net/index.html
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-dark.css";
// 滚动条
// import "codemirror/addon/scroll/simplescrollbars.css";
// import "codemirror/addon/scroll/simplescrollbars.js";

import "codemirror/mode/javascript/javascript.js"; //
import { parse, stringify } from "@/lib/utils";
export default {
  props: {
    value: null,
    type: {
      type: String,
      default: "javascript",
    },
  },
  components: {
    codemirror,
  },
  data() {
    return {
      code: "",
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: "text/javascript",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
        // scrollbarStyle: "simple",
        // more codemirror options, 更多 codemirror 的高级配置...
      },
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
        let _value = value;
        if (this.type_filter === "json") {
          try {
            _value = stringify(_value);
          } catch (error) {
            console.log(_value);
            console.error("json转换出错");
            return;
          }
        }
        this.code = _value;
      },
    },
    code() {
      clearTimeout(this.watch_code_timer);
      this.watch_code_timer = setTimeout(() => {
        let code = this.code;
        if (this.type_filter === "json") {
          try {
            if (typeof parse(code) === "object") {
              code = parse(code);
            } else {
              return;
            }
          } catch (error) {
            console.error("json转换出错");
            return;
          }
        }
        this.$emit("input", code);
      }, 200);
    },
  },
  methods: {
    onCmReady(cm) {
      console.log("the editor is readied!", cm);
    },
    onCmFocus(cm) {
      cm;
      // console.log("the editor is focus!", cm);
    },
    onCmCodeChange(newCode) {
      this.code = newCode;
    },
  },
};
</script>

<style lang="less" scoped>
.CodeEditor {
  /deep/ .CodeMirror {
    height: 200px;
  }
  /deep/ .cm-s-base16-dark.CodeMirror {
    background-color: var(--background-1);
  }
  /deep/ .cm-s-base16-dark .CodeMirror-gutters {
    background-color: var(--background-1);
    border-right: 1px solid var(--border-color);
  }
  /deep/ .CodeMirror-simplescroll-horizontal {
    background-color: #2d2f38;
  }
  /deep/ .CodeMirror-simplescroll-horizontal div {
    background: #5a6073;
    border: 1px solid var(--border-color);
  }
}
</style>
