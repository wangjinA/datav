<template>
  <div class="Setup">
    <div class="Setup-title">{{ activeLayer ? "组件设置" : "页面设置" }}</div>
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
      <li v-for="(item, index) in baseSetup" :key="index">
        <SetupForm :target="activeLayer.editOption" :item="item" />
      </li>
    </ul>
    <ul class="Setup-ul" v-if="!activeLayer">
      <li v-for="(item, index) in pageSetup" :key="index">
        <SetupForm :target="datavInfo" :item="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import componentConfig from "@/config/componentConfig";
import SetupForm from "./SetupForm.vue";
const baseSetup = [
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
    type: "input",
  },
  {
    name: "h",
    key: "h",
    type: "input",
  },
];
const pageSetup = [
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
export default {
  name: "Setup",
  components: { SetupForm },
  data() {
    return {
      contextMenuVisible: false,
      baseSetup,
      pageSetup,
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
        cursor: pointer;
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
