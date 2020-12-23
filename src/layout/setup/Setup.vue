<!--
 * @Author: 汪锦
 * @Date: 2020-12-14 16:22:51
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-12-23 10:07:24
 * @Description: 设置栏
-->
<template>
  <div class="Setup">
    <div class="Setup-title">{{ activeLayer ? "组件设置" : "页面设置" }}</div>
    <!-- 多个Setup-ul是因为target不同 -->
    <ul class="Setup-ul" v-if="activeLayer">
      <li v-for="(item, index) in componentSetup" :key="index">
        <SetupForm :target="activeLayer.componentOption" :item="item" />
        <!-- <label>{{ item.name }}</label>
        <section>
          <Input
            size="small"
            v-model="activeLayer.componentOption[item.key]"
            :type="item.inputType"
          />
        </section> -->
      </li>
    </ul>
    <ul class="Setup-ul" v-if="activeLayer">
      <li v-for="(item, index) in componentBaseSetup" :key="index">
        <SetupForm :target="activeLayer.editOption" :item="item" />
      </li>
    </ul>
    <ul class="Setup-ul" v-if="!activeLayer">
      <li v-for="(item, index) in pageBaseSetup" :key="index">
        <SetupForm :target="datavInfo" :item="item" />
      </li>
    </ul>
    <ul class="Setup-ul" v-if="!activeLayer">
      <li v-for="(item, index) in pageStyleSetup" :key="index">
        <SetupForm :target="datavInfo && datavInfo.style" :item="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import componentConfig from "@/config/componentConfig";
import { componentBaseConfig } from "@/config/modules";
import SetupForm from "./SetupForm.vue";

const imgList = [];

// 项目基本设置
const pageBaseSetup = [
  {
    name: "项目名称",
    key: "name",
  },
  {
    name: "预览图",
    key: "preview_img",
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
    };
  },
  computed: {
    ...mapState(["resourceLayers", "activeLayer", "datavInfo"]),

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
    ...mapMutations(["removeLayer"]),

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
  }
}
</style>
