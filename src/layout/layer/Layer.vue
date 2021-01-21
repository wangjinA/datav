<template>
  <div class="Layer" @click.self="setActiveLayer(null)">
    <div class="Layer-title">图层</div>
    <!-- <ul class="Layer-ul not-data" ref="layer-ul" > -->

    <div class="Layer-operation">
      <Icon type="ios-folder" title="新建文件夹" />
    </div>
    <!-- <div>
      <draggable v-model="list" animation="300" group="site">
        <transition-group tag="div" @contextmenu.stop>
          <div key="111">123</div>
          <LayerItem v-for="item in list" :key="item.$vueKey" :item="item"> </LayerItem>
        </transition-group>
      </draggable>
    </div> -->
    <div ref="list-wrap" class="list-wrap">
      <draggable v-model="draggableList" animation="300" group="site">
        <transition-group tag="ul" class="Layer-ul not-data" @contextmenu.stop>
          <LayerItem v-for="item in resourceLayers" :key="item.$vueKey" :item="item"> </LayerItem>
        </transition-group>
      </draggable>
    </div>
    <!-- </ul> -->
    <Vue-context-menu
      class="right-menu"
      :target="$refs['list-wrap']"
      :show="contextMenuVisible"
      @update:show="(show) => (contextMenuVisible = show)"
    >
      <Right-menu-list @click.native="contextMenuVisible = false"></Right-menu-list>
    </Vue-context-menu>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { component as VueContextMenu } from "@xunlei/vue-context-menu";
import RightMenuList from "./rightMenuList";
import draggable from "vuedraggable";
import LayerItem from "./layerItem";
export default {
  name: "Layer",
  components: {
    VueContextMenu,
    RightMenuList,
    draggable,
    LayerItem,
  },
  data() {
    return {
      contextMenuVisible: false,
      list: [],
    };
  },
  computed: {
    ...mapState("layer", ["resourceLayers", "activeLayer"]),
    draggableList: {
      get() {
        return this.resourceLayers;
      },
      set(value) {
        this.resetLayer(value);
        this.updateLayers({
          name: "图层移动",
        });
      },
    },
  },
  methods: {
    ...mapMutations("layer", ["removeLayer", "resetLayer"]),
    ...mapActions("layer", ["updateLayers"]),
  },
};
</script>

<style lang="less" scoped>
.Layer {
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  border-right: 1px solid #0d0e10;
  transition: all linear 500ms;
  background: var(--background);
  min-width: 160px;
  max-width: 200px;
  font-size: 14px;
  color: #fafafa;
  flex-shrink: 0;
  &-operation {
    padding: 8px 12px;
    color: #e6e8f4;
    .ivu-icon {
      &:hover {
        cursor: pointer;
        color: var(--primary-color);
      }
    }
  }
  .list-wrap {
    flex: 1;
    overflow: auto;
  }
  &-ul {
    padding-bottom: 50px;
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
