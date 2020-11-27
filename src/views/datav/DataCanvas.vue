<template>
  <div class="DatavCanvas" ref="DatavCanvas" :style="wrapStyle">
    <vue-draggable-resizable
      class-name="screen-box"
      class-name-draggable="screen-box-draggable"
      :draggable="true"
      :resizable="true"
      :key="item.name"
      :active.sync="item.active"
      snap
      v-for="item in resourceLayers"
      v-bind="getBaseOption(item.editOption)"
      @activated="onActivated(item)"
      @deactivated="onDeactivated(item)"
      @resizing="onResize(item)"
      @refLineParams="getRefLineParams"
    >
      <component
        :ref="item.name"
        :is="item.componentName"
        v-bind="item.componentOption"
      ></component>
    </vue-draggable-resizable>
    <!-- 对齐基线 -->
    <span
      class="ref-line v-line"
      v-for="(item, i) in vLine"
      :key="i"
      v-show="item.display"
      :style="{ left: item.position, top: item.origin, height: item.lineLength }"
    />
    <span
      class="ref-line h-line"
      v-for="(item, i) in hLine"
      :key="100 + i"
      v-show="item.display"
      :style="{ top: item.position, left: item.origin, width: item.lineLength }"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import HeaderV1 from "@/components/header";
import EchartTemplate from "@/components/echart-template";
import ThreedTags from "@/components/threed-tags";
import ScrollText from "@/components/ScrollText";
export default {
  name: "DatavCanvas",
  props: {
    msg: String,
  },
  components: {
    HeaderV1,
    EchartTemplate,
    ThreedTags,
    ScrollText,
  },
  data() {
    return {
      scale: 1,
      vLine: [],
      hLine: [],
    };
  },
  computed: {
    ...mapState(["resourceLayers", "activeLayer"]),
    wrapStyle() {
      return {
        transform: `scale(${this.scale})`,
      };
    },
  },
  methods: {
    ...mapMutations(["addLayer", "setActiveLayer"]),
    // 激活焦点
    onActivated(item) {
      this.setActiveLayer(item);
    },
    // 失去焦点
    onDeactivated() {
      this.setActiveLayer(null);
    },
    // 调整大小 echarts
    onResize(item) {
      if (item.componentName === "echart-template" || item.componentName === "echart") {
        this.$refs[item.name][0].resize();
      }
    },
    getBaseOption(item) {
      return {
        ...item,
        w: item.w === "100%" ? this.$refs.DatavCanvas.offsetWidth : item.w,
        h: item.h === "100%" ? this.$refs.DatavCanvas.offsetHeight : item.h,
      };
    },
    getRefLineParams(params) {
      const { vLine, hLine } = params;
      this.vLine = vLine;
      this.hLine = hLine;
    },
  },
  created() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.DatavCanvas {
  background-color: #313239;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.screen-box {
  position: relative;
}
</style>
