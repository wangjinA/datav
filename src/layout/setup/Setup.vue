<!--
 * @Author: 汪锦
 * @Date: 2020-12-14 16:22:51
 * @LastEditors: 汪锦
 * @LastEditTime: 2021-02-18 17:32:28
 * @Description: 设置栏
-->
<template>
  <div class="Setup" ref="setup" :class="show ? 'show' : 'hide'" @click="clickHandler">
    <template v-if="show">
      <div class="Setup-title">
        <div class="Setup-hide" @click.stop="show = false">
          <Icon type="md-arrow-round-forward" size="16" />
          <small>收起</small>
        </div>
        <span>{{ setupTitle }}</span>
      </div>
      <!-- 多个Setup-ul是因为target不同 -->
      <div class="Setup-container">
        <template v-if="activeLayer">
          <!-- 图层组件名称信息设置 -->
          <ul class="Setup-ul">
            <li v-for="(item, index) in layerInfoSetup" :key="index">
              <SetupForm isUpdateLayers :target="activeLayer" :item="item" />
            </li>
          </ul>
          <!-- 组件设置 props -->
          <ul class="Setup-ul">
            <li v-for="(item, index) in componentSetup" :key="index">
              <SetupForm isUpdateLayers :target="activeLayer.componentOption" :item="item" />
            </li>
          </ul>
          <!-- 组件基本设置 xywh -->
          <ul class="Setup-ul">
            <li v-for="(item, index) in componentBaseSetup" :key="index">
              <SetupForm isUpdateLayers :target="activeLayer.editOption" :item="item" />
            </li>
          </ul>
        </template>
        <template v-else>
          <!-- 项目基本信息设置 name 预览图 -->
          <ul class="Setup-ul" v-if="!activeLayer">
            <li v-for="(item, index) in pageBaseSetup" :key="index">
              <SetupForm isUpdateDatavInfo :target="datavInfo" :item="item" />
            </li>
          </ul>
          <!-- 项目风格属性设置 xywh -->
          <ul class="Setup-ul" v-if="!activeLayer">
            <li v-for="(item, index) in pageStyleSetup" :key="index">
              <SetupForm isUpdateDatavInfo :target="datavInfo && datavInfo.style" :item="item" />
            </li>
          </ul>
        </template>
      </div>
    </template>
    <div v-if="!show" class="showBtn" @click="show = true">
      <Icon type="ios-arrow-back" size="20" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import componentConfig from "@/config/componentConfig";
import { componentBaseConfig } from "@/config/modules";
import SetupForm from "./SetupForm.vue";

const imgList = [];

const layerInfoSetup = [
  {
    name: "组件名称",
    key: "name",
  },
];

// 项目基本设置
const pageBaseSetup = [
  {
    name: "项目名称",
    key: "name",
  },
  {
    name: "预览图",
    key: "preview_img",
    disabled: true,
    type: "img",
  },
];
// 页面属性风格设置
const pageStyleSetup = [
  {
    name: "x",
    key: "x",
    inputType: "number",
  },
  {
    name: "y",
    key: "y",
    inputType: "number",
  },
  {
    name: "w",
    key: "w",
    inputType: "number",
  },
  {
    name: "h",
    key: "h",
    inputType: "number",
  },
  {
    name: "背景类型",
    key: "bgType",
    type: "select",
    data: [
      {
        name: "图片背景",
        value: 0,
      },
      {
        name: "颜色背景",
        value: 1,
      },
    ],
    relation: {
      0: [
        {
          name: "图片列表",
          key: "backgroundImage",
          type: "select",
          data: imgList,
        },
      ],
      1: [
        {
          name: "颜色选择",
          key: "backgroundColor",
          type: "color",
        },
      ],
    },
  },
  {
    name: "背景图",
    key: "backgroundImage",
    type: "img",
  },
];
export default {
  name: "Setup",
  components: { SetupForm },
  props: {
    isPreviewComponent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      contextMenuVisible: false,
      componentBaseSetup: componentBaseConfig(true),
      pageBaseSetup,
      pageStyleSetup,
      layerInfoSetup,
      show: true,
    };
  },
  computed: {
    ...mapState("layer", ["resourceLayers", "activeLayer", "datavInfo"]),

    componentSetup() {
      if (this.activeLayer) {
        const targetConfig = componentConfig.filter((item) => item.id === this.activeLayer.id)[0];
        if (targetConfig) {
          return targetConfig.componentSetup;
        }
      }
      return [];
    },

    setupTitle() {
      if (this.activeLayer || this.isPreviewComponent) {
        return "组件设置";
      }
      return "页面设置";
    },
  },
  watch: {
    show(value) {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$bus.$emit("componentResize");
        }, 300);
      });
      if (value) {
        this.$refs.setup.classList.add("hideTag");
      } else {
        this.$refs.setup.classList.remove("hideTag");
      }
    },
  },
  methods: {
    ...mapMutations("layer", ["removeLayer"]),

    del() {
      this.$delAPI("确认删除").then(() => {
        this.removeLayer(this.$selectItem);
      });
    },

    onContextmenu(item) {
      this.$selectItem = item;
    },

    selectHandle(item) {
      item.active = true;
    },

    initImgList() {
      this.$API.getBgList().then((res) => {
        imgList.splice(0, imgList.length);
        res.data
          .filter((i) => i.type === 0)
          .map((item) => {
            imgList.push({
              name: item.name,
              value: item.src,
            });
          });
      });
    },
    clickHandler() {
      !this.show && (this.show = true);
    },
    onmousemove(e) {
      if (!this.show) {
        const { pageX } = e;
        const windowWidth = document.documentElement.offsetWidth;
        if (pageX / windowWidth > 0.95) {
          this.$refs.setup.classList.remove("hideTag");
        } else {
          this.$refs.setup.classList.add("hideTag");
        }
      }
    },
  },
  created() {
    this.initImgList();
    window.addEventListener("mousemove", this.onmousemove);
  },
  destroyed() {
    window.removeEventListener("mousemove", this.onmousemove);
  },
};
</script>

<style lang="less" scoped>
.Setup {
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  border-right: 1px solid #0d0e10;
  transition: all linear 500ms;
  background: var(--background);
  min-width: 330px;
  font-size: 12px;
  color: #fafafa;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  transform: scaleX(1);
  transform-origin: right;
  opacity: 1;
  &.hideTag {
    transform: scaleX(0);
    opacity: 0;
    overflow: hidden;
  }
  &.hide {
    min-width: 20px;
    width: 20px;
    position: absolute;
    right: 0;
    .showBtn {
      color: #999;
      margin: auto;
    }
    &:hover {
      cursor: pointer;
      .showBtn {
        color: var(--primary-color);
      }
    }
  }
  &-container {
    flex: 1;
    overflow: auto;
    padding-bottom: 30px;
  }
  &-ul {
    > li {
      /deep/ .SetupForm {
        padding: 0 20px;
        position: relative;
        color: var(--text-base);
        align-items: center;
        min-height: 45px;
        // margin-bottom: 20px;
        display: flex;
        > label {
          width: 96px;
        }
      }
    }
  }
  &-title {
    height: 40px;
    line-height: 40px;
    padding: 0 16px;
    text-align: center;
    background: #2d2f38;
    border-bottom: 1px solid #0d0e10;
    flex-shrink: 0;
    position: relative;
    .Setup-hide {
      position: absolute;
      color: #999;
      &:hover {
        color: var(--primary-color);
        cursor: pointer;
      }
      small {
        display: none;
      }
    }
    &:hover {
      .Setup-hide {
        small {
          display: inline;
        }
      }
    }
  }
}
</style>
