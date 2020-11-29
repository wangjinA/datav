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
      @resizing="onResize(item, ...arguments)"
      @dragging="onDragging(item, ...arguments)"
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
      :style="{
        left: item.position,
        top: item.origin,
        height: item.lineLength,
      }"
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
import { stringify } from "@/lib/utils";
import html2canvas from "html2canvas";
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
  watch: {
    resourceLayers: {
      deep: true,
      handler(resourceLayers) {
        clearTimeout(this.watch_timer);
        this.watch_timer = setTimeout(() => {
          this.$put("/api/datav/1", {
            name: "test_new",
            preview_img: "text_img_new",
            option: stringify(resourceLayers),
          });
        }, 200);
      },
    },
  },
  methods: {
    ...mapMutations(["addLayer", "setActiveLayer"]),
    onDrag(...a) {
      console.log(a);
    },
    // 激活焦点
    onActivated(item) {
      this.setActiveLayer(item);
    },
    // 失去焦点
    onDeactivated() {
      this.setActiveLayer(null);
    },
    // 调整位置
    onDragging(item, ...position) {
      const x = position[0];
      const y = position[1];
      item.editOption.x = x;
      item.editOption.y = y;
    },
    // 调整大小 echarts
    onResize(item, ...size) {
      const w = size[2];
      const h = size[3];
      item.editOption.w = w;
      item.editOption.h = h;
      if (
        item.componentName === "echart-template" ||
        item.componentName === "echart"
      ) {
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
  created() {
    this.$bus.$on("screenshot", () => {
      html2canvas(this.$refs.DatavCanvas).then((canvas) => {
        canvas.toBlob((blob) => {
          let filename = `${new Date().getTime()}.jpg`;
          let file = new File([blob], filename, { type: "image/jpg" });
          const url = window.URL.createObjectURL(file)
          console.log(file);
          console.log(url);
          window.open(url)
        });
      });
    });
  },
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
