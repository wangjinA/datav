<template>
  <div class="echart-template" :style="{ width, height }" ref="echartTemplate" @resize="test"></div>
</template>

<script>
import echartMixin from "./echartMixins";
export default {
  mixins: [echartMixin],
  name: "echartTemplate",
  props: {
    options: {
      type: Object,
      required: true,
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
      this.myChart.setOption(this.options);
      this.resize();
      this.myChart.on("click", (params) => {
        this.$emit("click", params);
      });
    },
  },
  destroyed() {},
  mounted() {
    this.$nextTick(this.init);
  },
};
</script>

<style lang="less" scoped>
.echart-template {
  width: 100%;
  height: 100%;
}
</style>
