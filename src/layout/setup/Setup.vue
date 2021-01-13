<!--
 * @Author: 汪锦
 * @Date: 2020-12-14 16:22:51
 * @LastEditors: 汪锦
 * @LastEditTime: 2021-01-13 10:06:52
 * @Description: 设置栏
-->
<template>
  <div class="Setup">
    <div class="Setup-title">{{ activeLayer ? "组件设置" : "页面设置" }}</div>
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
  data() {
    return {
      contextMenuVisible: false,
      componentBaseSetup: componentBaseConfig(true),
      pageBaseSetup,
      pageStyleSetup,
      layerInfoSetup,
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
  },
  created() {
    this.initImgList();
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
  }
}
</style>
