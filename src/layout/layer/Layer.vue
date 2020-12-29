<template>
  <div class="Layer" @click.self="setActiveLayer(null)">
    <div class="Layer-title">图层</div>
    <ul class="Layer-ul not-data" ref="layer-ul" @contextmenu.stop>
      <li
        v-for="item in resourceLayers"
        :key="item.$vueKey"
        :class="{ active: item.active }"
        @click="selectHandle(item)"
        @contextmenu.prevent="onContextmenu(item)"
      >
        <div class="preview-img-box">
          <img :src="item.previewImage" />
        </div>
        <p>{{ item.name }}</p>
      </li>
    </ul>
    <!-- <div class="not-data" v-if="!resourceLayers.length">暂无图层</div> -->
    <Vue-context-menu
      class="right-menu"
      :target="$refs['layer-ul']"
      :show="contextMenuVisible"
      @update:show="(show) => (contextMenuVisible = show)"
    >
      <Right-menu-list @click="contextMenuVisible = false"></Right-menu-list>
    </Vue-context-menu>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { component as VueContextMenu } from "@xunlei/vue-context-menu";
import RightMenuList from "./rightMenuList";
export default {
  name: "Layer",
  components: {
    VueContextMenu,
    RightMenuList,
  },
  data() {
    return {
      contextMenuVisible: false,
    };
  },
  computed: {
    ...mapState(["resourceLayers", "activeLayer"]),
  },
  methods: {
    ...mapMutations(["removeLayer", "setActiveLayer"]),
    onContextmenu(item) {
      this.setActiveLayer(item);
    },

    selectHandle(item) {
      this.setActiveLayer(item);
    },
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
  &-ul {
    flex: 1;
    overflow: auto;
    > li {
      padding: 0 8px;
      position: relative;
      cursor: pointer;
      color: var(--text-base);
      align-items: center;
      height: 44px;
      padding-left: 12px;
      display: flex;
      &:hover {
        background-color: var(--background-hover);
      }
      &.active {
        background-color: var(--primary-color);
      }
      .preview-img-box {
        width: 45px;
        height: 29px;
        margin-right: 5px;
        > img {
          width: 100%;
          height: 100%;
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
