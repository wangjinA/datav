<template>
  <div class="DatavCanvas" ref="DatavCanvas" :style="wrapStyle" @click.self="canavsHandle">
    <vue-draggable-resizable
      class-name="screen-box"
      class-name-draggable="screen-box-draggable"
      :key="item.$vueKey"
      :active="item.active"
      :prevent-deactivation="true"
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
import { getInt, getBfb, parse } from "@/lib/utils";
import html2canvas from "html2canvas";
export default {
  name: "DatavCanvas",
  props: {
    readonly: {
      type: Boolean,
      default: false,
    },
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
      id: this.$route.params.id,
    };
  },
  computed: {
    ...mapState(["resourceLayers", "activeLayer", "datavInfo"]),
    wrapStyle() {
      let bgi;
      let style;
      if (this.datavInfo && this.datavInfo.style) {
        bgi = `/api/public/${this.datavInfo.style.backgroundImage}`;
        style = this.datavInfo.style;
      }
      return {
        ...style,
        backgroundImage: `url(${bgi})`,
        transform: `scale(${this.scale})`,
      };
    },
  },
  methods: {
    ...mapMutations(["addLayer", "setActiveLayer", "setDatavInfo", "initLayer"]),

    canavsHandle() {
      this.setActiveLayer(null);
    },
    // 激活焦点
    onActivated(item) {
      this.setActiveLayer(item);
    },
    // 失去焦点
    onDeactivated() {
      // this.setActiveLayer(null);
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
      if (item.componentName === "echart-template" || item.componentName === "echart") {
        this.$refs[item.name][0].resize();
      }
    },
    getBaseOption(item) {
      let readonlyProps = {
        resizable: !this.readonly,
        draggable: !this.readonly,
      };
      const DatavCanvasDom = this.$refs.DatavCanvas || {};
      return {
        ...item,
        w: getBfb(item.w, DatavCanvasDom.offsetWidth),
        h: getBfb(item.h, DatavCanvasDom.offsetHeight),
        // h: item.h === "100%" ? DatavCanvasDom.offsetHeight * getBfb(item.h) : item.h,
        x: getInt(item.x),
        y: getInt(item.y),
        ...readonlyProps,
      };
    },
    // 对基线
    getRefLineParams(params) {
      const { vLine, hLine } = params;
      this.vLine = vLine;
      this.hLine = hLine;
    },
    // 截屏上传
    screenshot() {
      html2canvas(this.$refs.DatavCanvas).then((canvas) => {
        canvas.toBlob((blob) => {
          let filename = `datav_${this.id + Date.now()}.jpg`;
          let file = new File([blob], filename, { type: "image/jpg" });
          const url = window.URL.createObjectURL(file);
          console.log(file);
          console.log(url);
          // window.open(url);
          const formData = new FormData();
          formData.append("file", file);
          this.$post("/api/api/upload", formData).then(() => {
            this.datavInfo.preview_img = filename;
          });
        });
      });
    },

    initDataInfo(isInit) {
      this.$get(`/api/api/datav/${this.id}`).then((res) => {
        isInit && this.initLayer(parse(res.data.option));
        delete res.data.option;
        this.setDatavInfo(res.data);
      });
    },
  },
  created() {
    this.initDataInfo(true);
    this.$bus_$on("screenshot", this.screenshot);
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
  background-size: 100% 100%;
}
.screen-box {
  position: relative;
}
</style>
