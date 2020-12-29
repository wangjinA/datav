<template>
  <div class="echart-template" :style="{ width, height }" ref="echartTemplate" @resize="test"></div>
</template>

<script>
import echartMixin from "./echartMixins";
export default {
  mixins: [echartMixin],
  name: "EchartTemplate",
  props: {
    options: {
      name: "echart配置",
      setupCodeType: "javascript",
      type: [Object, String],
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
  },
  data() {
    return {};
  },
  watch: {
    options: {
      handler: "init",
      deep: true,
    },
  },
  methods: {
    test() {
      console.log(1);
    },
    resize() {
      clearTimeout(this.$resizeTimer);
      this.$resizeTimer = setTimeout(() => {
        this.$nextTick(this.myChart.resize);
      }, 0);
    },
    init() {
      if (!this.myChart) {
        this.myChart = window.$echarts.init(this.$refs.echartTemplate);
      } else {
        this.myChart.clear();
      }
      var option;
      if (typeof this.options === "string") {
        try {
          eval(this.options);
        } catch (error) {
          // let errInfo = error.toString();
          console.error(error);
        }
      } else {
        option = this.options;
      }
      console.log(option);
      if (!option) {
        return;
      }
      this.myChart.setOption(option);
      this.resize();
      this.myChart.on("click", (params) => {
        this.$emit("click", params);
      });
    },
  },
  mounted() {
    this.$nextTick(this.init);
  },
  destroyed() {
    this.myChart && this.myChart.dispose();
  },
};
</script>

<style lang="less" scoped>
.echart-template {
  width: 100%;
  height: 100%;
}
</style>
