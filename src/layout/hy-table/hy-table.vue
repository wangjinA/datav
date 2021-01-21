<!--
 * @Author: 汪锦
 * @Date: 2020-03-25 15:32:55
 * @LastEditors: 汪锦
 * @LastEditTime: 2021-01-15 17:00:24
 * @Description: 公共表格
 -->
<!--
  <template>
  <Table stripe :columns="columns" highlight-row :data="data" :loading="loading">
  </Table>
</template>
-->
<script>
export default {
  name: "HyTable",
  props: {
    styleOptions: {
      // 样式配置
      type: Object,
      default: () => ({}),
    },
    current: {
      type: Number,
    },
    total: {
      type: [Number, String],
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    openLoading: {
      // 是否显示loading动画
      type: Boolean,
      default: true,
    },
    showIndex: {
      // 是否显示index
      type: Boolean,
      default: false,
    },
    indexPosition: {
      type: String,
      default: "left",
    },
    selection: {
      // 是否显示选择框
      type: [String, Boolean],
      default: false,
    },
    columns: {
      // 表头
      type: Array,
      default: () => [],
    },

    data: {
      // 数据
      type: Array,
      default: () => [],
    },
    stripe: {
      // 隔行选中颜色
      type: Boolean,
      default: false,
    },
    hidePage: {
      // 隐藏page
      type: Boolean,
      default: false,
    },
    rowClassName: {
      // 各行class
      type: Function,
      default: () => "", // 返回各行class,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    colData() {
      let data = [...this.columns].map((item) => ({ ellipsis: true, ...item }));
      if (this.showIndex) {
        data = [{ title: "序号", key: "tableIndex", width: 70, align: "center" }, ...data];
      }
      if (this.selection) {
        // 判断是否需要显示选择框
        if (this.selection === "right")
          data = [...data, { type: "selection", width: 60, align: "center" }];
        else data = [{ type: "selection", width: 120, align: "center" }, ...data];
      }
      return data;
    },
    tableData() {
      let data = [...this.data];
      if (this.showIndex) {
        data = data.map((item, index) => ({ tableIndex: index + 1, ...item }));
      }
      return data;
    },
  },
  watch: {
    data: {
      handler() {
        this.$nextTick(() => this.initTableStyle());
      },
      immediate: true,
    },
  },
  render(h) {
    return h("div", {}, [
      h("Table", {
        class: "hyTable",
        attrs: {
          stripe: this.stripe, // 表格会间隔显示不同颜色，用于区分不同行数据
          highlightRow: true, // 高亮选中行
          columns: this.colData,
          data: this.tableData,
          loading: this.loading,
          "row-class-name": this.rowClassName,
          ...this.$attrs,
        },
        on: {
          "on-row-click": (row) => {
            this.$emit("on-row-click", row);
          },
          "on-selection-change": (selection) => {
            this.$emit("on-selection-change", selection);
          },
        },
        ref: "hyTable",
        scopedSlots: this.$scopedSlots, // 跨层级传递slot
      }),
      !this.hidePage && this.total > this.pageSize
        ? h("Page", {
            class: "common",
            attrs: {
              current: this.current,
              total: isNaN(parseInt(this.total)) ? 0 : parseInt(this.total),
              "page-size": this.pageSize,
              showTotal: true,
              styles: {
                textAlign: "center",
                margin: "15px 0",
                userSelect: "none",
                li: {
                  color: "#f55!important",
                  borderColor: "#f55",
                },
              },
            },
            ref: "hyPage",
            on: {
              // "on-change": page => {
              //   this.$emit("changePage", page);
              // },
              "update:current": (page) => {
                this.$emit("update:current", page);
                this.$parent.current = page;
                if (typeof this.$parent.f5 === "function") {
                  this.loading = this.openLoading;
                  this.$parent.f5().finally(() => {
                    this.loading = false;
                  });
                }
              },
            },
          })
        : "",
    ]);
  },
  methods: {
    strAddLine(str) {
      // backgroundColor -> background-color
      if (typeof str === "string") {
        str = str.split("");
        str.forEach((item, index) => {
          if (/[A-Z]/.test(item)) {
            str.splice(index, 1, "-", item.toLocaleLowerCase());
          }
        });
        str = str.join("");
      }
      return str;
    },
    jsonToStyle(style, isImportant) {
      isImportant = isImportant ? "!important" : "";
      if (style instanceof Object) {
        let s = [];
        for (let i in style) {
          if (typeof style[i] === "object") continue;
          s.push(`${this.strAddLine(i)}:${style[i]}${isImportant}`);
        }
        return s.join(";");
      }
      return "";
    },
    initTableStyle() {
      if (this.styleOptions && Object.keys(this.styleOptions).length) {
        let table = this.$refs.hyTable.$el;
        let tagArr = ["td", "th"];
        tagArr.forEach((tag) => {
          if (this.styleOptions[tag]) {
            table.querySelectorAll(tag).forEach((el) => {
              el.style = this.jsonToStyle(this.styleOptions[tag], true);
            });
          }
        });
      }
    },
    getHyTable() {
      return this.$refs.hyTable;
    },
    //获取table组件得方法
    getTabMathod() {
      return this.$refs.hyTable;
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped></style>
