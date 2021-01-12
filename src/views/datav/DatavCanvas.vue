<template>
  <div
    class="DatavCanvas"
    ref="DatavCanvas"
    :class="readonly ? 'readonly' : 'editor'"
    tabindex="0"
    @keydown.space.prevent="handleSpaceDown"
    @keyup.space.prevent="handleSpaceUp"
    @wheel.prevent="handleTableWheel($event)"
    @click.self="canavsHandle"
  >
    <div
      class="container-view"
      :style="{ transform: `scale(${this.scaleValue})` }"
      v-if="datavInfo"
    >
      <!-- 容器的配置操作都在warp.js mixins中 -->
      <vue-draggable-resizable
        ref="screen-box-wrap"
        :class-name="!activeLayer ? 'screen-box-wrap select-screen' : 'screen-box-wrap'"
        class-name-draggable="screen-box-wrap-draggable"
        :style="wrapStyle"
        :scaleRatio="scaleValue"
        v-bind="getWrapBaseOption"
        :draggable="screenDraggable"
        :resizable="false"
        @click.self.native="canavsHandle"
        @resizing="onWrapResize"
        @dragging="onWrapDragging"
      >
        <!-- 单个拖拽组件 -->
        <!-- :z="item.zIndex === undefined ? 1 : item.zIndex" -->
        <vue-draggable-resizable
          v-for="item in resourceLayers"
          :key="item.$vueKey"
          class-name="screen-box"
          class-name-draggable="-wrap"
          :active="item.active"
          :prevent-deactivation="true"
          :scaleRatio="scaleValue"
          snap
          v-bind="getBaseOption(item.editOption)"
          @contextmenu.native="onActivated(item)"
          @activated="onActivated(item)"
          @deactivated="onDeactivated(item)"
          @resizing="onResize(item, false, ...arguments)"
          @dragging="onDragging(item, false, ...arguments)"
          @resizestop="onResize(item, true, ...arguments)"
          @dragstop="onDragging(item, true, ...arguments)"
          @refLineParams="getRefLineParams"
        >
          <component
            :ref="item.$vueKey"
            :is="item.componentName"
            v-bind="item.componentOption"
          ></component>
        </vue-draggable-resizable>
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
      </vue-draggable-resizable>
      <!-- 对齐基线 -->
    </div>
    <Slider
      class="Slider"
      v-if="datavInfo && !readonly"
      v-model="datavInfo.style.scale"
      :max="1.5"
      :min="0.2"
      :step="0.1"
      show-stops
    ></Slider>
    <Vue-context-menu
      v-if="!readonly"
      class="right-menu"
      :target="$refs['DatavCanvas']"
      :show="contextMenuVisible"
      @update:show="(show) => (contextMenuVisible = show)"
    >
      <Right-menu-list @click.native="contextMenuVisible = false"></Right-menu-list>
    </Vue-context-menu>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { getInt, getBfb, parse, deepClone } from "@/lib/utils";
import html2canvas from "html2canvas";
import C from "@/components/exportCom"; // 导出组件
import wrap from "./mixins/wrap";
import { component as VueContextMenu } from "@xunlei/vue-context-menu";
import RightMenuList from "@/layout/layer/rightMenuList";
export default {
  name: "DatavCanvas",
  mixins: [wrap],
  props: {
    readonly: {
      // 预览状态
      type: Boolean,
      default: false,
    },
  },
  components: {
    ...C,
    VueContextMenu,
    RightMenuList,
  },
  data() {
    return {
      vLine: [],
      hLine: [],
      id: this.$route.params.id,
      screenDraggable: false, // 空格拖拽容器
      contextMenuVisible: false,
    };
  },
  computed: {
    ...mapState("layer", ["resourceLayers", "activeLayer", "datavInfo"]),

    scale() {
      return this.datavInfo ? this.datavInfo.style.scale : 1;
    },

    wrapStyle() {
      let bg;
      let style;
      if (this.datavInfo && this.datavInfo.style) {
        style = this.datavInfo.style;
        if (style.bgType == 0) {
          bg = `url(${this.$getUrl(style.backgroundImage)})`;
        } else {
          bg = style.backgroundColor;
        }
      }
      return {
        ...style,
        background: bg,
      };
    },
    scaleValue() {
      return this.readonly ? 1 : this.scale;
    },
  },
  methods: {
    ...mapMutations("layer", ["addLayer", "setActiveLayer", "setDatavInfo", "initLayer"]),
    ...mapActions("layer", ["updateLayers"]),

    // 滚轮
    handleTableWheel(e) {
      // e.wheelDelta 是120的倍数； 正数是放大 负数是缩小
      // 按住了ctrl
      if (e.ctrlKey && !this.readonly) {
        let multiple = e.wheelDelta / 120;
        let scale_value = this.scale + 0.1 * multiple;
        if (scale_value > 1.5) {
          this.datavInfo.style.scale = 1.5;
        } else if (scale_value < 0.2) {
          this.datavInfo.style.scale = 0.2;
        } else {
          this.datavInfo.style.scale = scale_value;
        }
      }
    },
    // 键盘【空格】按下
    handleSpaceDown() {
      if (!this.readonly) this.screenDraggable = true;
    },
    // 键盘【空格】弹起
    handleSpaceUp() {
      if (!this.readonly) this.screenDraggable = false;
    },
    // 取消选中组件
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
    onDragging(item, triggerUpdate = false, ...position) {
      clearTimeout(this.onDragging_timer);
      this.onDragging_timer = setTimeout(() => {
        if (!triggerUpdate) {
          console.log("调整位置 - 开始");
          const x = position[0];
          const y = position[1];
          item.editOption.x = x;
          item.editOption.y = y;
        } else {
          console.log("调整位置 - 停止");
          this.updateLayers({ name: "调整位置" });
        }
      }, 20);
    },
    // 调整大小 echarts
    onResize(item, triggerUpdate = false, ...size) {
      clearTimeout(this.onResize_timer);
      this.onResize_timer = setTimeout(() => {
        if (!triggerUpdate) {
          console.log("调整大小 - 开始");
          const x = size[0];
          const y = size[1];
          const w = size[2];
          const h = size[3];
          item.editOption.x = x;
          item.editOption.y = y;
          item.editOption.w = w;
          item.editOption.h = h;
          let target = this.$refs[item.$vueKey][0];
          console.log(item);
          target.resize && target.resize();
        } else {
          console.log("调整大小 - 停止");
          this.updateLayers({ name: "调整大小" });
        }
      }, 20);
      // if (item.componentName === "echart-template" || item.componentName === "echart") {
      //   this.$refs[item.name][0].resize();
      // }
    },
    // 基本配置项
    getBaseOption(item) {
      const style = this.datavInfo && this.datavInfo.style;
      const width = style ? style.w : 0;
      const height = style ? style.h : 0;
      const option = {
        ...item,
        w: getBfb(item.w, width),
        h: getBfb(item.h, height),
        x: getInt(item.x),
        y: getInt(item.y),
        z: getInt(item.z, 2),
      };
      // 只读状态下 || 空格拖动容器状态下
      if (this.readonly || this.screenDraggable) {
        option.resizable = false;
        option.draggable = false;
      }
      return option;
    },
    // 对基线
    getRefLineParams(params) {
      const { vLine, hLine } = params;
      this.vLine = vLine;
      this.hLine = hLine;
    },
    // 截屏上传
    screenshot() {
      let scaleValue = this.datavInfo.style.scale;
      let result = new Promise((resolve, reject) => {
        this.$Spin.show();
        this.datavInfo.style.scale = 1;
        this.$nextTick(() => {
          html2canvas(this.$refs["screen-box-wrap"].$el)
            .then((canvas) => {
              canvas.toBlob((blob) => {
                let filename = `预览图.jpg`;
                let file = new File([blob], filename, { type: "image/jpg" });
                const url = window.URL.createObjectURL(file);
                console.log(file);
                console.log(url);
                // window.open(url);
                const formData = new FormData();
                formData.append("dir", `datav_${this.id}`);
                formData.append("file", file);
                this.$API
                  .upload(formData)
                  .then((res) => {
                    this.datavInfo.preview_img = res.data.src;
                    resolve();
                  })
                  .catch(reject);
              });
            })
            .catch(reject);
        });
      });
      result
        .then(() => {
          this.$Message.success("生成成功");
        })
        .catch((err) => {
          console.log(err);
          this.$Message.success("生成失败");
        })
        .finally(() => {
          this.datavInfo.style.scale = scaleValue;
          this.$store.dispatch("layer/updateDatavInfo", {
            name: "预览图设置",
          });
          this.$Spin.hide();
        });
    },

    initDataInfo(isInit) {
      this.$get(`/api/datav/${this.id}`).then((res) => {
        // 先渲染基本设置
        {
          let data = deepClone(res.data);
          delete data.option;
          this.setDatavInfo(data);
        }
        // if (res) return;
        this.$nextTick(() => {
          isInit && this.initLayer(parse(res.data.option || "[]"));
        });
      });
    },
  },
  created() {
    console.log(this);
    this.initDataInfo(true);
    this.$bus_$on("screenshot", this.screenshot);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.outline-style() {
  outline: 1px dashed var(--primary-color);
}
.DatavCanvas {
  background-color: #313239;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  outline: none;
  // 编辑状态下
  &.editor {
    .select-screen {
      // background-color: var(--background-1);
      .outline-style();
    }
    .screen-box {
      &.active {
        .outline-style();
      }
    }

    .screen-box-wrap-draggable {
      filter: brightness(0.9);
      cursor: grab;
      .outline-style();
    }
    .screen-box-wrap {
      &.select-screen {
        .outline-style();
      }
    }
  }
  // 只读状态下
  .Slider {
    position: absolute;
    right: 20px;
    bottom: 20px;
    width: 150px;
  }
}
.container-view {
  width: 100%;
  height: 100%;
  position: relative;
  transform-origin: left top;
}
.screen-box-wrap {
  position: relative;
  background-size: 100% 100%;
}
.screen-box {
  position: absolute;
  /deep/ .handle {
    z-index: 99;
    background: #fff;
    border: 1px solid var(--primary-color);
    border-radius: 50%;
  }
}
</style>
