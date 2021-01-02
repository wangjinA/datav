<template>
  <div class="CodeEditor-wrap" :style="{ height: height }">
    <codemirror
      class="CodeEditor"
      :value="code"
      :options="cmOptions"
      @ready="onCmReady"
      @focus="onCmFocus"
      @input="onCmCodeChange"
    />
    <transition name="scaleY">
      <div class="json-error" v-if="type_filter === 'json' && jsonErr">
        json转换出错，请检查
      </div>
    </transition>
  </div>
</template>

<script>
// csdn https://blog.csdn.net/qq_16698261/article/details/106397108
// 官网 https://codemirror.net/index.html
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-dark.css";

import "codemirror/mode/javascript/javascript.js";
import { beautifierJs } from "@/lib/Beautifier";
export default {
  props: {
    value: null,
    codeType: {
      type: String,
      default: "javascript",
    },
    height: {
      type: String,
      default: "150px",
    },
    isBeautifier: {
      type: Boolean,
      default: true,
    }
  },
  components: {
    codemirror,
  },
  data() {
    return {
      code: "",
      jsonErr: false,
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
      return this.codeType.toLowerCase();
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        // console.log(value);
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
        if(this.isBeautifier) {
          this.code = beautifierJs(_value);
        }else {
          this.code = _value;
        }
      },
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
      // this.code = newCode;
      let _value = newCode;
      if (this.type_filter === "json") {
        try {
          _value = JSON.parse(_value);
          this.jsonErr = false;
        } catch (error) {
          this.jsonErr = true;
          console.log(_value);
          console.error("json转换出错");
          return;
        }
      }
      this.$emit("input", _value);
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.CodeEditor-wrap {
  position: relative;
  .json-error {
    position: absolute;
    top: 0;
    left: 30px;
    right: 5px;
    padding: 0 10px;
    z-index: 99999;
    background-color: #ffefe6;
    border-radius: 2px;
    color: #f05a33;
    transform-origin: top;
  }
}
.CodeEditor {
  height: 100%;
  /deep/ .CodeMirror {
    height: 100%;
    font-size: 14px;
    font-family: Consolas, "Courier New", monospace;
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
