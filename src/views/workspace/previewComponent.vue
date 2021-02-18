<template>
  <div class="previewComponent">
    <main ref="main">
      <vue-draggable-resizable
        v-if="isMounted"
        ref="screen-box-wrap"
        @resizing="onResize"
        @dragging="onDragging"
        v-bind="getBaseOption()"
        :key="dragKey"
      >
        <component
          ref="com"
          :is="targetItem.componentName"
          v-bind="activeLayer && activeLayer.componentOption"
        ></component>
      </vue-draggable-resizable>
    </main>
    <Setup isPreviewComponent class="datav-style" style="height: 100%;" />
  </div>
</template>

<script>
import Setup from "@/layout/setup";
import C from "@/components/exportCom"; // 导出组件
import componentConfig from "@/config/componentConfig";
import { mapState } from "vuex";
import { getInt, getBfb } from "@/lib/utils";
export default {
  name: "previewComponent",
  components: {
    ...C,
    Setup,
  },
  data() {
    return {
      isMounted: false,
      dragKey: 1,
    };
  },
  methods: {
    // 基本配置项
    getBaseOption() {
      if (!this.activeLayer) {
        return {};
      }
      const editOption = this.activeLayer.editOption;
      const mainDom = this.$refs.main;
      const width = mainDom ? mainDom.offsetWidth : 0;
      const height = mainDom ? mainDom.offsetHeight : 0;
      const w = getBfb(editOption.w, width);
      const h = getBfb(editOption.h, height);
      if (editOption.w !== w || editOption.h !== h) {
        this.$nextTick(() => {
          let target = this.$refs.com;
          target.resize && target.resize();
        });
      }
      const option = {
        ...editOption,
        w: w,
        h: h,
        x: getInt(editOption.x),
        y: getInt(editOption.y),
        z: getInt(editOption.z, 2),
      };
      return option;
    },
    // 调整位置
    onDragging(...position) {
      clearTimeout(this.onDragging_timer);
      this.onDragging_timer = setTimeout(() => {
        const x = position[0];
        const y = position[1];
        this.activeLayer.editOption.x = x;
        this.activeLayer.editOption.y = y;
      }, 20);
    },
    // 调整大小 echarts
    onResize(...size) {
      clearTimeout(this.onResize_timer);
      this.onResize_timer = setTimeout(() => {
        const x = size[0];
        const y = size[1];
        const w = size[2];
        const h = size[3];
        this.activeLayer.editOption.x = x;
        this.activeLayer.editOption.y = y;
        this.activeLayer.editOption.w = w;
        this.activeLayer.editOption.h = h;
        let target = this.$refs.com;
        target.resize && target.resize();
      }, 20);
    },
  },
  computed: {
    ...mapState("layer", ["activeLayer"]),
    targetItem() {
      return componentConfig.filter((item) => item.id == this.$route.params.id)[0];
    },
  },
  mounted() {
    this.isMounted = true;
  },
  created() {
    if (!this.targetItem) {
      return this.$router.push("/404");
    }
    this.$store.commit(
      "layer/setActiveLayer",
      componentConfig.filter((item) => item.id === this.targetItem.id)[0]
    );
    this.$bus_$on("componentResize", () => {
      if (this.activeLayer.editOption.w.includes("%")) {
        this.dragKey = Date.now();
      }
    });
  },
};
</script>
<style lang="less" scoped>
.previewComponent {
  background-color: var(--background-2);
  height: 100vh;
  display: flex;
  main {
    flex: 1;
    .vdr {
      border: none;
      &.active {
        outline: 1px dashed var(--primary-color);
      }
    }
  }
}
</style>
