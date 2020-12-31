<template>
  <div id="CodeEditor"></div>
</template>

<script>
import { beautifierConf } from "./config";
// import ClipboardJS from "clipboard";
// import { saveAs } from "file-saver";
import loadMonaco from "@/lib/loadMonaco";
import loadBeautifier from "@/lib/loadBeautifier";

let beautifier; // 美化对象
let monaco; // 编辑器

export default {
  name: "CodeEditor",
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
        this.code = _value;
      },
    },
  },
  methods: {
    preventDefaultSave(e) {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
      }
    },
    onOpen() {
      loadBeautifier((btf) => {
        beautifier = btf;
        this.beautifierJson = beautifier.js(this.code, beautifierConf.js);
        loadMonaco((val) => {
          monaco = val;
          console.log(val);
          this.setEditorValue("CodeEditor", this.beautifierJson);
        });
      });
    },
    onClose() {},
    setEditorValue(id, codeStr) {
      if (this.jsonEditor) {
        this.jsonEditor.setValue(codeStr);
      } else {
        this.jsonEditor = monaco.editor.create(document.getElementById(id), {
          value: codeStr,
          theme: "vs-dark",
          language: this.type_filter,
          automaticLayout: true,
        });
        // ctrl + s 刷新
        this.jsonEditor.onKeyDown((e) => {
          if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
            this.refresh();
          }
        });
      }
    },
    // exportJsonFile() {
    //   this.$prompt("文件名:", "导出文件", {
    //     inputValue: `${+new Date()}.json`,
    //     closeOnClickModal: false,
    //     inputPlaceholder: "请输入文件名",
    //   }).then(({ value }) => {
    //     if (!value) value = `${+new Date()}.json`;
    //     const codeStr = this.jsonEditor.getValue();
    //     const blob = new Blob([codeStr], { type: "text/plain;charset=utf-8" });
    //     saveAs(blob, value);
    //   });
    // },
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
    this.onOpen();
    // const clipboard = new ClipboardJS(".copy-json-btn", {
    //   text: (trigger) => {
    //     this.$notify({
    //       title: "成功",
    //       message: "代码已复制到剪切板，可粘贴。",
    //       type: "success",
    //     });
    //     return this.beautifierJson;
    //   },
    // });
    // clipboard.on("error", (e) => {
    //   this.$message.error("代码复制失败");
    // });
  },
  beforeDestroy() {
    this.jsonEditor.destroy();
  },
};
</script>

<style lang="less" scoped>
#CodeEditor {
  height: 200px;
}
</style>
